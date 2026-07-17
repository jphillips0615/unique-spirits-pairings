import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");

    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      console.error("Required Supabase environment variables are missing.");

      return jsonResponse(
        {
          error: "The account deletion service is not configured.",
        },
        500,
      );
    }

    const authorizationHeader = request.headers.get("Authorization");

    if (!authorizationHeader) {
      return jsonResponse(
        {
          error: "You must be signed in to delete your account.",
        },
        401,
      );
    }

    /*
     * This client uses the caller's access token.
     * It verifies which signed-in user made the request.
     */
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authorizationHeader,
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      console.error(
        "Unable to verify account deletion request:",
        userError?.message,
      );

      return jsonResponse(
        {
          error:
            "Your session is invalid or has expired. Please sign in again.",
        },
        401,
      );
    }

    /*
     * This privileged client exists only inside the server-side
     * Edge Function. The service-role key never reaches the app.
     */
    const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    /*
     * Remove profile images before deleting the auth user.
     * Storage objects are not part of the public-table cascade.
     */
    const { data: profileImages, error: listImagesError } =
      await adminClient.storage.from("profile-images").list(user.id, {
        limit: 100,
      });

    if (listImagesError) {
      console.warn(
        "Unable to list profile images before deletion:",
        listImagesError.message,
      );
    } else if (profileImages && profileImages.length > 0) {
      const imagePaths = profileImages.map(
        (image) => `${user.id}/${image.name}`,
      );

      const { error: removeImagesError } = await adminClient.storage
        .from("profile-images")
        .remove(imagePaths);

      if (removeImagesError) {
        console.warn(
          "Unable to remove every profile image:",
          removeImagesError.message,
        );
      }
    }

    /*
     * Deleting auth.users removes the related profile,
     * favorites, and inventory through ON DELETE CASCADE.
     */
    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(
      user.id,
      false,
    );

    if (deleteUserError) {
      console.error(
        "Unable to delete authenticated user:",
        deleteUserError.message,
      );

      return jsonResponse(
        {
          error: "Your account could not be deleted. Please try again.",
        },
        500,
      );
    }

    return jsonResponse({
      success: true,
      message: "Your account and associated data were deleted.",
    });
  } catch (error) {
    console.error("Unexpected account deletion error:", error);

    return jsonResponse(
      {
        error: "An unexpected error occurred while deleting your account.",
      },
      500,
    );
  }
});
