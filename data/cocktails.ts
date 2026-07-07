import { Cocktail } from "@/types/cocktail";

const oldFashionedImage = require("../assets/images/cocktails/old-fashioned.jpg");
const manhattanImage = require("../assets/images/cocktails/manhattan.jpg");
const negroniImage = require("../assets/images/cocktails/negroni.jpg");
const martiniImage = require("../assets/images/cocktails/martini.jpeg");
const margaritaImage = require("../assets/images/cocktails/margarta.jpeg");
const mojitoImage = require("../assets/images/cocktails/mojihto.jpeg");
const bourbonSourImage = require("../assets/images/cocktails/bourbon-sour.jpg");
const boulevardierImage = require("../assets/images/cocktails/boulevardier.jpg");
const mintJulepImage = require("../assets/images/cocktails/mint-julep.jpg");
const sazeracImage = require("../assets/images/cocktails/sazerac.jpg");
const gimletImage = require("../assets/images/cocktails/gimlet.jpg");
const french75Image = require("../assets/images/cocktails/french-75.jpg");
const sidecarImage = require("../assets/images/cocktails/sidecar.jpeg");
const tomCollinsImage = require("../assets/images/cocktails/tom-collins.jpeg");
const goldRushImage = require("../assets/images/cocktails/gold-rush.jpg");
const beesKneesImage = require("../assets/images/cocktails/bees-knees.jpg");
const aviationImage = require("../assets/images/cocktails/aviation.jpeg");
const whiteRussianImage = require("../assets/images/cocktails/white-russian.jpg");
const irishCoffeeImage = require("../assets/images/cocktails/irish-coffee.jpeg");
const penicillinImage = require("../assets/images/cocktails/pennicillin.jpg");

export const cocktails: Cocktail[] = [
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    spirit: "Bourbon",
    image: oldFashionedImage,
    description:
      "A timeless whiskey cocktail built around balance, depth, and slow-sipping warmth.",
    ingredients: [
      "2 oz bourbon whiskey",
      "1 sugar cube or 1/2 oz simple syrup",
      "2 dashes Angostura bitters",
      "Orange peel",
      "Large ice cube",
    ],
    instructions: [
      "Add sugar and bitters to a rocks glass.",
      "Muddle until the sugar begins to dissolve.",
      "Add bourbon and a large ice cube.",
      "Stir gently until chilled.",
      "Express an orange peel over the drink and garnish.",
    ],
    pairings: [
      "Ribeye steak",
      "Aged cheddar",
      "Smoked almonds",
      "Dark chocolate",
    ],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "Orange Peel",
    ice: "Large Cube",
    flavorProfile: ["Bold", "Smooth", "Slightly Sweet", "Aromatic"],
    story:
      "The Old Fashioned is one of the original cocktail templates: spirit, sugar, bitters, and water. It became a symbol of classic American drinking because it lets the whiskey stay front and center.",
    tips: [
      "Use a large ice cube so the drink chills slowly without watering down too fast.",
      "Express the orange peel over the glass before dropping it in.",
      "Choose a bourbon or rye you would actually enjoy sipping neat.",
    ],
  },
  {
    id: "manhattan",
    name: "Manhattan",
    spirit: "Rye",
    image: manhattanImage,
    description:
      "A refined whiskey cocktail made with rye, sweet vermouth, and bitters.",
    ingredients: [
      "2 oz rye whiskey",
      "1 oz sweet vermouth",
      "2 dashes Angostura bitters",
      "Brandied cherry",
    ],
    instructions: [
      "Add rye, sweet vermouth, and bitters to a mixing glass with ice.",
      "Stir until well chilled.",
      "Strain into a chilled coupe glass.",
      "Garnish with a brandied cherry.",
    ],
    pairings: [
      "Prime rib",
      "Blue cheese",
      "Roasted mushrooms",
      "Dark chocolate",
    ],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Brandied Cherry",
    ice: "Served Up",
    flavorProfile: ["Rich", "Smooth", "Lightly Sweet", "Herbal", "Warming"],
    story:
      "The Manhattan became one of the defining whiskey cocktails of the late 1800s and remains a classic because of its simple but elegant balance of whiskey, vermouth, and bitters.",
    tips: [
      "Use fresh sweet vermouth and refrigerate it after opening.",
      "Stir instead of shaking to keep the drink silky and clear.",
      "Use rye for a spicier drink or bourbon for a softer, sweeter version.",
    ],
  },
  {
    id: "negroni",
    name: "Negroni",
    spirit: "Gin",
    image: negroniImage,
    description:
      "A bittersweet Italian classic with gin, Campari, and sweet vermouth.",
    ingredients: [
      "1 oz gin",
      "1 oz Campari",
      "1 oz sweet vermouth",
      "Orange peel",
    ],
    instructions: [
      "Add gin, Campari, and sweet vermouth to a mixing glass with ice.",
      "Stir until chilled.",
      "Strain into a rocks glass over a large ice cube.",
      "Garnish with an orange peel.",
    ],
    pairings: ["Charcuterie", "Olives", "Parmesan", "Grilled steak"],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "Orange Peel",
    ice: "Large Cube",
    flavorProfile: ["Bitter", "Herbal", "Citrusy", "Bold"],
    story:
      "The Negroni is loved for its equal-parts simplicity and bold bitter edge. It is a classic aperitif cocktail built to wake up the palate.",
    tips: [
      "Use a quality sweet vermouth and keep it refrigerated.",
      "Stir gently to keep the texture smooth.",
      "Try a citrus-forward gin if you want a brighter version.",
    ],
  },
  {
    id: "martini",
    name: "Martini",
    spirit: "Gin",
    image: martiniImage,
    description: "A clean, iconic cocktail built with gin and dry vermouth.",
    ingredients: [
      "2 1/2 oz gin",
      "1/2 oz dry vermouth",
      "Lemon twist or olive",
    ],
    instructions: [
      "Add gin and dry vermouth to a mixing glass with ice.",
      "Stir until very cold.",
      "Strain into a chilled martini or coupe glass.",
      "Garnish with a lemon twist or olive.",
    ],
    pairings: ["Oysters", "Shrimp cocktail", "Marcona almonds", "Soft cheese"],
    difficulty: "Medium",
    glass: "Martini Glass",
    garnish: "Lemon Twist or Olive",
    ice: "Served Up",
    flavorProfile: ["Dry", "Crisp", "Botanical", "Clean"],
    story:
      "The Martini is one of the most famous cocktails ever made. Small changes in gin, vermouth, garnish, and dilution can completely change the drink.",
    tips: [
      "Chill the glass before serving.",
      "Use fresh dry vermouth.",
      "Stir longer than you think for the right chill and dilution.",
    ],
  },
  {
    id: "margarita",
    name: "Margarita",
    spirit: "Tequila",
    image: margaritaImage,
    description:
      "A bright tequila cocktail balanced with lime and orange liqueur.",
    ingredients: [
      "2 oz blanco tequila",
      "1 oz fresh lime juice",
      "3/4 oz orange liqueur",
      "1/2 oz agave syrup",
      "Salt rim",
    ],
    instructions: [
      "Rim a rocks glass with salt if desired.",
      "Add tequila, lime juice, orange liqueur, and agave to a shaker with ice.",
      "Shake until chilled.",
      "Strain over fresh ice.",
      "Garnish with a lime wheel.",
    ],
    pairings: [
      "Tacos",
      "Chips and guacamole",
      "Grilled shrimp",
      "Chicken fajitas",
    ],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "Lime Wheel",
    ice: "Cubed Ice",
    flavorProfile: ["Citrusy", "Tart", "Refreshing", "Slightly Sweet"],
    story:
      "The Margarita is one of the most popular tequila cocktails because it balances spirit, citrus, sweetness, and salt in a simple but powerful way.",
    tips: [
      "Use fresh lime juice, not bottled.",
      "Adjust agave depending on how tart your limes are.",
      "Blanco tequila keeps the drink crisp and bright.",
    ],
  },
  {
    id: "mojito",
    name: "Mojito",
    spirit: "Rum",
    image: mojitoImage,
    description:
      "A refreshing Cuban cocktail with rum, mint, lime, sugar, and soda.",
    ingredients: [
      "2 oz white rum",
      "1 oz fresh lime juice",
      "3/4 oz simple syrup",
      "Fresh mint leaves",
      "Club soda",
    ],
    instructions: [
      "Gently muddle mint with lime juice and simple syrup.",
      "Add rum and ice.",
      "Stir to combine.",
      "Top with club soda.",
      "Garnish with a mint sprig.",
    ],
    pairings: ["Ceviche", "Fish tacos", "Grilled chicken", "Fresh fruit"],
    difficulty: "Easy",
    glass: "Highball Glass",
    garnish: "Mint Sprig",
    ice: "Crushed or Cubed Ice",
    flavorProfile: ["Minty", "Citrusy", "Refreshing", "Light"],
    story:
      "The Mojito is a warm-weather classic known for its bright mint and lime profile. It is refreshing without hiding the rum completely.",
    tips: [
      "Do not shred the mint; muddle gently.",
      "Use fresh mint and fresh lime.",
      "Top with soda right before serving.",
    ],
  },
  {
    id: "bourbon-sour",
    name: "Bourbon Sour",
    spirit: "Bourbon",
    image: bourbonSourImage,
    description:
      "A smooth whiskey sour with bourbon, lemon, and a touch of sweetness.",
    ingredients: [
      "2 oz bourbon",
      "3/4 oz fresh lemon juice",
      "3/4 oz simple syrup",
      "Optional egg white",
      "Cherry and lemon wheel",
    ],
    instructions: [
      "Add bourbon, lemon juice, simple syrup, and egg white if using to a shaker.",
      "Dry shake without ice if using egg white.",
      "Add ice and shake again until chilled.",
      "Strain into a rocks glass.",
      "Garnish with a cherry and lemon wheel.",
    ],
    pairings: ["Fried chicken", "BBQ pork", "Sharp cheddar", "Apple pie"],
    difficulty: "Medium",
    glass: "Rocks Glass",
    garnish: "Cherry and Lemon Wheel",
    ice: "Cubed Ice",
    flavorProfile: ["Tart", "Smooth", "Sweet", "Citrusy"],
    story:
      "The Whiskey Sour is a foundational sour cocktail. Bourbon gives it a rounder, sweeter character than sharper rye-based versions.",
    tips: [
      "Fresh lemon juice makes a huge difference.",
      "Egg white creates a silky foam but is optional.",
      "Shake hard to get the best texture.",
    ],
  },
  {
    id: "boulevardier",
    name: "Boulevardier",
    spirit: "Bourbon",
    image: boulevardierImage,
    description:
      "A whiskey-based cousin of the Negroni with rich bittersweet depth.",
    ingredients: [
      "1 1/2 oz bourbon",
      "1 oz Campari",
      "1 oz sweet vermouth",
      "Orange peel",
    ],
    instructions: [
      "Add bourbon, Campari, and sweet vermouth to a mixing glass with ice.",
      "Stir until chilled.",
      "Strain into a rocks glass over a large cube.",
      "Garnish with an orange peel.",
    ],
    pairings: ["Braised beef", "Charcuterie", "Aged gouda", "Dark chocolate"],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "Orange Peel",
    ice: "Large Cube",
    flavorProfile: ["Bitter", "Rich", "Warming", "Herbal"],
    story:
      "The Boulevardier swaps gin for whiskey, turning the Negroni formula into something darker, richer, and more warming.",
    tips: [
      "Bourbon makes it rounder; rye makes it spicier.",
      "Use a large cube to control dilution.",
      "A bold vermouth works especially well here.",
    ],
  },
  {
    id: "mint-julep",
    name: "Mint Julep",
    spirit: "Bourbon",
    image: mintJulepImage,
    description: "A chilled bourbon cocktail with fresh mint and crushed ice.",
    ingredients: [
      "2 1/2 oz bourbon",
      "1/2 oz simple syrup",
      "Fresh mint leaves",
      "Crushed ice",
    ],
    instructions: [
      "Gently muddle mint and simple syrup in a julep cup or rocks glass.",
      "Add bourbon.",
      "Fill with crushed ice.",
      "Stir until the outside of the glass frosts.",
      "Top with more crushed ice and garnish with mint.",
    ],
    pairings: ["BBQ ribs", "Fried chicken", "Pimento cheese", "Pecan pie"],
    difficulty: "Medium",
    glass: "Julep Cup",
    garnish: "Mint Bouquet",
    ice: "Crushed Ice",
    flavorProfile: ["Minty", "Cold", "Bourbon-Forward", "Slightly Sweet"],
    story:
      "The Mint Julep is strongly associated with Southern hospitality and the Kentucky Derby, but it is also a great showcase for bourbon.",
    tips: [
      "Use plenty of crushed ice.",
      "Slap the mint before garnishing to release aroma.",
      "Do not over-muddle the mint.",
    ],
  },
  {
    id: "sazerac",
    name: "Sazerac",
    spirit: "Rye",
    image: sazeracImage,
    description:
      "A bold New Orleans classic with rye, bitters, sugar, and absinthe.",
    ingredients: [
      "2 oz rye whiskey",
      "1 sugar cube",
      "3 dashes Peychaud's bitters",
      "Absinthe rinse",
      "Lemon peel",
    ],
    instructions: [
      "Rinse a chilled rocks glass with absinthe and discard the excess.",
      "Muddle sugar and bitters in a mixing glass.",
      "Add rye and ice.",
      "Stir until chilled.",
      "Strain into the prepared glass.",
      "Express a lemon peel over the drink.",
    ],
    pairings: ["Blackened steak", "Gumbo", "Blue cheese", "Candied pecans"],
    difficulty: "Medium",
    glass: "Rocks Glass",
    garnish: "Lemon Peel",
    ice: "Served Neat",
    flavorProfile: ["Bold", "Spiced", "Herbal", "Aromatic"],
    story:
      "The Sazerac is a New Orleans icon. Its combination of rye, Peychaud's bitters, sugar, and absinthe gives it a distinct old-world personality.",
    tips: [
      "Use only a light absinthe rinse.",
      "Do not drop the lemon peel into the drink unless you prefer extra citrus oil.",
      "Rye keeps the cocktail dry and spicy.",
    ],
  },
  {
    id: "gimlet",
    name: "Gimlet",
    spirit: "Gin",
    image: gimletImage,
    description: "A simple gin cocktail with lime and sweetness.",
    ingredients: [
      "2 oz gin",
      "3/4 oz fresh lime juice",
      "3/4 oz simple syrup",
      "Lime wheel",
    ],
    instructions: [
      "Add gin, lime juice, and simple syrup to a shaker with ice.",
      "Shake until chilled.",
      "Strain into a chilled coupe glass.",
      "Garnish with a lime wheel.",
    ],
    pairings: ["Grilled fish", "Goat cheese", "Cucumber salad", "Sushi"],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Lime Wheel",
    ice: "Served Up",
    flavorProfile: ["Tart", "Bright", "Clean", "Citrusy"],
    story:
      "The Gimlet is proof that a cocktail does not need many ingredients to be great. Gin and lime do most of the work.",
    tips: [
      "Fresh lime juice gives the best flavor.",
      "Try a floral gin for a softer profile.",
      "Shake well to make it crisp and cold.",
    ],
  },
  {
    id: "french-75",
    name: "French 75",
    spirit: "Gin",
    image: french75Image,
    description: "A sparkling gin cocktail with lemon, sugar, and Champagne.",
    ingredients: [
      "1 oz gin",
      "1/2 oz fresh lemon juice",
      "1/2 oz simple syrup",
      "Champagne or sparkling wine",
      "Lemon twist",
    ],
    instructions: [
      "Add gin, lemon juice, and simple syrup to a shaker with ice.",
      "Shake until chilled.",
      "Strain into a flute or coupe.",
      "Top with Champagne.",
      "Garnish with a lemon twist.",
    ],
    pairings: ["Brie", "Smoked salmon", "Oysters", "Strawberry tart"],
    difficulty: "Medium",
    glass: "Flute or Coupe",
    garnish: "Lemon Twist",
    ice: "Served Up",
    flavorProfile: ["Sparkling", "Citrusy", "Bright", "Elegant"],
    story:
      "The French 75 is light, sharp, and celebratory. It combines the structure of a sour with the lift of sparkling wine.",
    tips: [
      "Top gently so the bubbles stay lively.",
      "Use dry sparkling wine to keep it balanced.",
      "Serve very cold.",
    ],
  },
  {
    id: "sidecar",
    name: "Sidecar",
    spirit: "Cognac",
    image: sidecarImage,
    description:
      "A bright, elegant classic made with cognac, orange liqueur, and fresh lemon.",
    ingredients: [
      "2 oz cognac",
      "3/4 oz orange liqueur",
      "3/4 oz fresh lemon juice",
      "Optional sugar rim",
      "Orange twist",
    ],
    instructions: [
      "Chill a coupe glass and add a light sugar rim if desired.",
      "Add cognac, orange liqueur, and lemon juice to a shaker with ice.",
      "Shake until well chilled.",
      "Double strain into the prepared glass.",
      "Garnish with an orange twist.",
    ],
    pairings: ["Roast duck", "Baked brie", "Pork tenderloin", "Crème brûlée"],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Orange Twist",
    ice: "Served Up",
    flavorProfile: ["Citrusy", "Rich", "Tart", "Elegant"],
    story:
      "The Sidecar became popular in the early twentieth century and remains one of the best-known cognac cocktails. Its simple sour-style balance allows the warmth of the cognac and the brightness of the citrus to stand together.",
    tips: [
      "Use fresh lemon juice for the cleanest flavor.",
      "Apply only a partial sugar rim so the drink does not become too sweet.",
      "Choose a cognac you would also enjoy sipping on its own.",
    ],
  },
  {
    id: "tom-collins",
    name: "Tom Collins",
    spirit: "Gin",
    image: tomCollinsImage,
    description:
      "A crisp, refreshing gin cocktail with lemon, simple syrup, and sparkling water.",
    ingredients: [
      "2 oz gin",
      "1 oz fresh lemon juice",
      "3/4 oz simple syrup",
      "2 oz club soda",
      "Lemon wheel",
      "Cherry",
    ],
    instructions: [
      "Add gin, lemon juice, and simple syrup to a shaker with ice.",
      "Shake until chilled.",
      "Strain into a Collins glass filled with fresh ice.",
      "Top with club soda.",
      "Garnish with a lemon wheel and cherry.",
    ],
    pairings: [
      "Grilled chicken",
      "Fish tacos",
      "Goat cheese salad",
      "Light seafood dishes",
    ],
    difficulty: "Easy",
    glass: "Collins Glass",
    garnish: "Lemon Wheel and Cherry",
    ice: "Cubed Ice",
    flavorProfile: ["Citrusy", "Refreshing", "Light", "Sparkling"],
    story:
      "The Tom Collins became popular in the nineteenth century and helped define the Collins family of tall, sparkling cocktails. Its combination of gin, lemon, sugar, and soda remains simple, balanced, and highly refreshing.",
    tips: [
      "Use fresh lemon juice for the brightest flavor.",
      "Add the club soda after shaking so it stays lively.",
      "Use plenty of ice to keep the drink cold without watering it down too quickly.",
    ],
  },
  {
    id: "gold-rush",
    name: "Gold Rush",
    spirit: "Bourbon Whiskey",
    image: goldRushImage,
    description:
      "A smooth modern bourbon cocktail balanced with fresh lemon and honey syrup.",
    ingredients: [
      "2 oz bourbon whiskey",
      "3/4 oz fresh lemon juice",
      "3/4 oz honey syrup",
      "Lemon twist",
    ],
    instructions: [
      "Add bourbon, lemon juice, and honey syrup to a shaker with ice.",
      "Shake until thoroughly chilled.",
      "Strain into a rocks glass over fresh ice.",
      "Garnish with a lemon twist.",
    ],
    pairings: [
      "Roasted chicken",
      "Glazed pork",
      "Sharp cheddar",
      "Honey-drizzled desserts",
    ],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "Lemon Twist",
    ice: "Large Ice Cube",
    flavorProfile: ["Rich", "Citrusy", "Honeyed", "Smooth"],
    story:
      "Created at New York's Milk & Honey bar in the early 2000s, the Gold Rush is a modern classic. It follows the structure of a whiskey sour while replacing simple syrup with honey for a richer and softer finish.",
    tips: [
      "Make honey syrup by mixing equal parts honey and warm water.",
      "Use fresh lemon juice to keep the cocktail bright and balanced.",
      "Choose a bourbon with enough body to stand up to the honey.",
    ],
  },
  {
    id: "bees-knees",
    name: "Bee's Knees",
    spirit: "Gin",
    image: beesKneesImage,
    description:
      "A bright Prohibition-era gin cocktail softened with fresh lemon and honey syrup.",
    ingredients: [
      "2 oz gin",
      "3/4 oz fresh lemon juice",
      "3/4 oz honey syrup",
      "Lemon twist",
    ],
    instructions: [
      "Add gin, lemon juice, and honey syrup to a shaker with ice.",
      "Shake until thoroughly chilled.",
      "Double strain into a chilled coupe glass.",
      "Garnish with a lemon twist.",
    ],
    pairings: [
      "Goat cheese crostini",
      "Grilled shrimp",
      "Roasted chicken",
      "Lemon tart",
    ],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Lemon Twist",
    ice: "Served Up",
    flavorProfile: ["Citrusy", "Floral", "Honeyed", "Bright"],
    story:
      "The Bee's Knees emerged during Prohibition, when honey and lemon were often used to soften the rough edges of homemade gin. Today, it remains a simple and elegant classic.",
    tips: [
      "Make honey syrup by mixing equal parts honey and warm water.",
      "Use fresh lemon juice for the best balance.",
      "A floral or citrus-forward gin works especially well.",
    ],
  },
  {
    id: "aviation",
    name: "Aviation",
    spirit: "Gin",
    image: aviationImage,
    description:
      "A floral and citrus-forward gin cocktail with maraschino liqueur and crème de violette.",
    ingredients: [
      "2 oz gin",
      "1/2 oz maraschino liqueur",
      "1/4 oz crème de violette",
      "3/4 oz fresh lemon juice",
      "Brandied cherry",
    ],
    instructions: [
      "Add gin, maraschino liqueur, crème de violette, and lemon juice to a shaker with ice.",
      "Shake until thoroughly chilled.",
      "Double strain into a chilled coupe glass.",
      "Garnish with a brandied cherry.",
    ],
    pairings: [
      "Goat cheese crostini",
      "Roasted chicken",
      "Light seafood dishes",
      "Lemon shortbread",
    ],
    difficulty: "Intermediate",
    glass: "Coupe Glass",
    garnish: "Brandied Cherry",
    ice: "Served Up",
    flavorProfile: ["Floral", "Citrusy", "Tart", "Elegant"],
    story:
      "The Aviation first appeared in the early twentieth century. Its pale violet color and floral character come from crème de violette, while maraschino liqueur adds subtle sweetness and complexity.",
    tips: [
      "Use crème de violette sparingly so it does not overpower the drink.",
      "Fresh lemon juice keeps the floral ingredients balanced.",
      "A dry London-style gin gives the cocktail a clean backbone.",
    ],
  },
  {
    id: "white-russian",
    name: "White Russian",
    spirit: "Vodka",
    image: whiteRussianImage,
    description:
      "A rich and creamy vodka cocktail made with coffee liqueur and cream.",
    ingredients: ["2 oz vodka", "1 oz coffee liqueur", "1 oz heavy cream"],
    instructions: [
      "Fill a rocks glass with ice.",
      "Add vodka and coffee liqueur.",
      "Slowly pour the cream over the top.",
      "Stir gently before drinking, or leave layered for presentation.",
    ],
    pairings: [
      "Chocolate cake",
      "Tiramisu",
      "Salted caramel desserts",
      "Roasted nuts",
    ],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "None",
    ice: "Cubed Ice",
    flavorProfile: ["Creamy", "Sweet", "Coffee", "Rich"],
    story:
      "The White Russian developed from the Black Russian, a vodka and coffee liqueur cocktail created in the late 1940s. Adding cream transformed it into the smooth dessert-style drink known today.",
    tips: [
      "Use chilled cream for the best texture.",
      "Pour the cream slowly over the back of a spoon for a layered look.",
      "For a lighter version, use half-and-half instead of heavy cream.",
    ],
  },
  {
    id: "irish-coffee",
    name: "Irish Coffee",
    spirit: "Irish Whiskey",
    image: irishCoffeeImage,
    description:
      "A warming combination of Irish whiskey, hot coffee, brown sugar, and softly whipped cream.",
    ingredients: [
      "1 1/2 oz Irish whiskey",
      "4 oz hot coffee",
      "2 tsp brown sugar",
      "1 oz lightly whipped cream",
    ],
    instructions: [
      "Warm an Irish coffee glass with hot water, then empty it.",
      "Add brown sugar and hot coffee to the glass.",
      "Stir until the sugar is fully dissolved.",
      "Add the Irish whiskey and stir gently.",
      "Float the lightly whipped cream over the back of a spoon.",
    ],
    pairings: ["Bread pudding", "Chocolate cake", "Apple tart", "Roasted nuts"],
    difficulty: "Intermediate",
    glass: "Irish Coffee Glass",
    garnish: "Whipped Cream",
    ice: "None",
    flavorProfile: ["Warm", "Coffee", "Creamy", "Rich"],
    story:
      "Irish Coffee is commonly credited to chef Joe Sheridan, who served the warming drink to travelers in Ireland during the 1940s. It later became internationally popular after being introduced in San Francisco.",
    tips: [
      "Use freshly brewed hot coffee.",
      "Whip the cream only until it thickens slightly so it can still float.",
      "Sip the coffee through the cream instead of stirring it in.",
    ],
  },
  {
    id: "penicillin",
    name: "Penicillin",
    spirit: "Scotch Whisky",
    image: penicillinImage,
    description:
      "A modern Scotch cocktail with lemon, honey, ginger, and a smoky whisky float.",
    ingredients: [
      "2 oz blended Scotch whisky",
      "3/4 oz fresh lemon juice",
      "3/4 oz honey-ginger syrup",
      "1/4 oz smoky Islay Scotch",
      "Candied ginger",
    ],
    instructions: [
      "Add the blended Scotch, lemon juice, and honey-ginger syrup to a shaker with ice.",
      "Shake until thoroughly chilled.",
      "Strain into a rocks glass over fresh ice.",
      "Float the smoky Scotch over the top.",
      "Garnish with candied ginger.",
    ],
    pairings: [
      "Smoked salmon",
      "Grilled pork",
      "Sharp cheddar",
      "Ginger desserts",
    ],
    difficulty: "Intermediate",
    glass: "Rocks Glass",
    garnish: "Candied Ginger",
    ice: "Large Ice Cube",
    flavorProfile: ["Smoky", "Citrusy", "Spiced", "Honeyed"],
    story:
      "The Penicillin was created in New York in the early 2000s by bartender Sam Ross. Its combination of Scotch, lemon, honey, and ginger quickly made it a modern classic.",
    tips: [
      "Use a smoky Scotch only for the float so it does not overpower the drink.",
      "Make honey-ginger syrup with fresh ginger for the strongest flavor.",
      "Pour the smoky whisky slowly over the back of a spoon for a cleaner float.",
    ],
  },
];
