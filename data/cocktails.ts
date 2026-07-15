import { Cocktail } from "@/types/cocktail";

const oldFashionedImage = require("../assets/images/cocktails/old-fashioned.jpg");
const manhattanImage = require("../assets/images/cocktails/manhattan.jpg");
const negroniImage = require("../assets/images/cocktails/negroni.jpg");
const martiniImage = require("../assets/images/cocktails/martini.jpeg");
const margaritaImage = require("../assets/images/cocktails/margarita.jpeg");
const mojitoImage = require("../assets/images/cocktails/mojito.jpeg");
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
const penicillinImage = require("../assets/images/cocktails/penicillin.jpg");
const brandyAlexanderImage = require("../assets/images/cocktails/brandy-alexander.jpg");
const cosmopolitanImage = require("../assets/images/cocktails/cosmopolitan.jpg");
const daiquiriImage = require("../assets/images/cocktails/daiquiri.jpg");
const darkAndStormyImage = require("../assets/images/cocktails/dark-and-stormy.jpg");
const espressoMartiniImage = require("../assets/images/cocktails/espresso-martini.jpg");
const maiTaiImage = require("../assets/images/cocktails/mai-tai.jpg");
const moscowMuleImage = require("../assets/images/cocktails/moscow-mule.jpg");
const palomaImage = require("../assets/images/cocktails/paloma.jpg");
const tequilaSunriseImage = require("../assets/images/cocktails/tequila-sunrise.jpg");
const tommysMargaritaImage = require("../assets/images/cocktails/tommys-margarita.jpg");

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
    spirit: "Bourbon",
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
    ice: "Large Cube",
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
    difficulty: "Medium",
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
    difficulty: "Medium",
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
    difficulty: "Medium",
    glass: "Rocks Glass",
    garnish: "Candied Ginger",
    ice: "Large Cube",
    flavorProfile: ["Smoky", "Citrusy", "Spiced", "Honeyed"],
    story:
      "The Penicillin was created in New York in the early 2000s by bartender Sam Ross. Its combination of Scotch, lemon, honey, and ginger quickly made it a modern classic.",
    tips: [
      "Use a smoky Scotch only for the float so it does not overpower the drink.",
      "Make honey-ginger syrup with fresh ginger for the strongest flavor.",
      "Pour the smoky whisky slowly over the back of a spoon for a cleaner float.",
    ],
  },

  {
    id: "brandy-alexander",
    name: "Brandy Alexander",
    spirit: "Brandy",
    image: brandyAlexanderImage,
    description:
      "A silky dessert cocktail combining brandy, dark crème de cacao, and cream.",
    ingredients: [
      "1 1/2 oz brandy or cognac",
      "1 oz dark crème de cacao",
      "1 oz heavy cream",
      "Freshly grated nutmeg",
    ],
    instructions: [
      "Add brandy, crème de cacao, and cream to a shaker with ice.",
      "Shake until thoroughly chilled.",
      "Double strain into a chilled coupe glass.",
      "Garnish with freshly grated nutmeg.",
    ],
    pairings: ["Chocolate mousse", "Tiramisu", "Spiced nuts", "Vanilla custard"],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Freshly Grated Nutmeg",
    ice: "Served Up",
    flavorProfile: ["Creamy", "Chocolate", "Rich", "Warming"],
    story:
      "The Brandy Alexander became a popular after-dinner cocktail in the early twentieth century. Its smooth blend of brandy, chocolate liqueur, and cream makes it feel almost like a drinkable dessert.",
    tips: [
      "Use very cold cream for the smoothest texture.",
      "Shake firmly to fully combine and aerate the ingredients.",
      "Grate the nutmeg fresh over the drink for the best aroma.",
    ],
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    spirit: "Vodka",
    image: cosmopolitanImage,
    description:
      "A crisp pink vodka cocktail with cranberry, orange liqueur, and fresh lime.",
    ingredients: [
      "1 1/2 oz citrus vodka",
      "3/4 oz orange liqueur",
      "1/2 oz fresh lime juice",
      "1/2 oz cranberry juice",
      "Orange twist",
    ],
    instructions: [
      "Add all liquid ingredients to a shaker with ice.",
      "Shake until very cold.",
      "Double strain into a chilled coupe or martini glass.",
      "Garnish with an orange twist.",
    ],
    pairings: ["Goat cheese crostini", "Shrimp cocktail", "Smoked salmon", "Berry desserts"],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Orange Twist",
    ice: "Served Up",
    flavorProfile: ["Citrusy", "Tart", "Lightly Sweet", "Crisp"],
    story:
      "The Cosmopolitan rose to prominence in the late twentieth century and became an icon of modern cocktail culture. Its appeal comes from a clean balance of citrus, cranberry, and vodka.",
    tips: [
      "Use only enough cranberry juice to give the drink a pale pink color.",
      "Fresh lime juice keeps the cocktail bright instead of sugary.",
      "Chill the serving glass before straining.",
    ],
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    spirit: "Rum",
    image: daiquiriImage,
    description:
      "A clean Cuban classic made with white rum, fresh lime, and simple syrup.",
    ingredients: [
      "2 oz white rum",
      "1 oz fresh lime juice",
      "3/4 oz simple syrup",
      "Lime wheel",
    ],
    instructions: [
      "Add rum, lime juice, and simple syrup to a shaker with ice.",
      "Shake until thoroughly chilled.",
      "Double strain into a chilled coupe glass.",
      "Garnish with a lime wheel.",
    ],
    pairings: ["Ceviche", "Grilled fish", "Cuban sandwiches", "Fresh tropical fruit"],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Lime Wheel",
    ice: "Served Up",
    flavorProfile: ["Citrusy", "Tart", "Refreshing", "Clean"],
    story:
      "The classic Daiquiri is not a frozen drink but a simple shaken combination of rum, lime, and sugar. Its three-part structure is one of the purest tests of balance in cocktail making.",
    tips: [
      "Use fresh lime juice and a clean white rum.",
      "Adjust the syrup slightly depending on the acidity of the lime.",
      "Shake hard so the drink is properly chilled and diluted.",
    ],
  },
  {
    id: "dark-and-stormy",
    name: "Dark 'n' Stormy",
    spirit: "Rum",
    image: darkAndStormyImage,
    description:
      "A bold highball pairing dark rum with spicy ginger beer and fresh lime.",
    ingredients: [
      "2 oz dark rum",
      "4 oz ginger beer",
      "1/2 oz fresh lime juice",
      "Lime wedge",
    ],
    instructions: [
      "Fill a highball glass with ice.",
      "Add ginger beer and lime juice.",
      "Float the dark rum over the top.",
      "Garnish with a lime wedge and stir before drinking.",
    ],
    pairings: ["Jerk chicken", "Barbecue ribs", "Fish tacos", "Spiced nuts"],
    difficulty: "Easy",
    glass: "Highball Glass",
    garnish: "Lime Wedge",
    ice: "Cubed Ice",
    flavorProfile: ["Spicy", "Dark", "Citrusy", "Refreshing"],
    story:
      "The Dark 'n' Stormy is closely associated with Bermuda, where dark rum and ginger beer became a natural pairing. The layered presentation suggests storm clouds gathering over a bright sea.",
    tips: [
      "Use a strongly flavored ginger beer rather than mild ginger ale.",
      "Pour the rum slowly for a dramatic layered appearance.",
      "Stir before drinking so the flavors combine evenly.",
    ],
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    spirit: "Vodka",
    image: espressoMartiniImage,
    description:
      "A rich, energizing cocktail combining vodka, coffee liqueur, and fresh espresso.",
    ingredients: [
      "1 1/2 oz vodka",
      "1 oz coffee liqueur",
      "1 oz fresh espresso",
      "1/4 oz simple syrup",
      "3 coffee beans",
    ],
    instructions: [
      "Add vodka, coffee liqueur, espresso, and simple syrup to a shaker with ice.",
      "Shake very hard until cold and foamy.",
      "Double strain into a chilled coupe or martini glass.",
      "Garnish with three coffee beans.",
    ],
    pairings: ["Tiramisu", "Chocolate cake", "Salted caramel", "Roasted hazelnuts"],
    difficulty: "Medium",
    glass: "Coupe Glass",
    garnish: "Three Coffee Beans",
    ice: "Served Up",
    flavorProfile: ["Coffee", "Rich", "Bittersweet", "Silky"],
    story:
      "The Espresso Martini was created in London in the 1980s. Fresh espresso and vigorous shaking give the cocktail its signature creamy foam without using dairy.",
    tips: [
      "Use fresh espresso for the strongest aroma and best foam.",
      "Shake harder and longer than a typical cocktail.",
      "Let hot espresso cool briefly so it does not melt too much ice.",
    ],
  },
  {
    id: "mai-tai",
    name: "Mai Tai",
    spirit: "Rum",
    image: maiTaiImage,
    description:
      "A complex tropical rum cocktail with lime, orange curaçao, and almond-rich orgeat.",
    ingredients: [
      "1 oz aged Jamaican rum",
      "1 oz aged agricole-style rum",
      "3/4 oz fresh lime juice",
      "1/2 oz orange curaçao",
      "1/2 oz orgeat syrup",
      "1/4 oz simple syrup",
      "Mint sprig and lime shell",
    ],
    instructions: [
      "Add all liquid ingredients to a shaker with ice.",
      "Shake until chilled.",
      "Pour into a rocks glass over crushed ice.",
      "Garnish with a mint sprig and spent lime shell.",
    ],
    pairings: ["Pork skewers", "Coconut shrimp", "Grilled pineapple", "Spicy noodles"],
    difficulty: "Medium",
    glass: "Rocks Glass",
    garnish: "Mint Sprig and Lime Shell",
    ice: "Crushed Ice",
    flavorProfile: ["Tropical", "Nutty", "Citrusy", "Complex"],
    story:
      "The Mai Tai is a cornerstone of tiki cocktail culture. A proper version focuses on quality rum, fresh lime, orange curaçao, and orgeat rather than a blend of random fruit juices.",
    tips: [
      "Use two complementary aged rums for greater depth.",
      "Do not substitute almond extract for real orgeat.",
      "Slap the mint gently before garnishing to release its aroma.",
    ],
  },
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    spirit: "Vodka",
    image: moscowMuleImage,
    description:
      "A bright and spicy vodka highball made with ginger beer and fresh lime.",
    ingredients: [
      "2 oz vodka",
      "1/2 oz fresh lime juice",
      "4 oz ginger beer",
      "Lime wheel",
    ],
    instructions: [
      "Fill a copper mug or highball glass with ice.",
      "Add vodka and fresh lime juice.",
      "Top with ginger beer.",
      "Stir gently and garnish with a lime wheel.",
    ],
    pairings: ["Fish tacos", "Grilled chicken", "Spicy appetizers", "Soft pretzels"],
    difficulty: "Easy",
    glass: "Copper Mug",
    garnish: "Lime Wheel",
    ice: "Cubed Ice",
    flavorProfile: ["Spicy", "Citrusy", "Refreshing", "Crisp"],
    story:
      "The Moscow Mule helped popularize vodka in the United States during the 1940s. Its memorable copper mug and sharp ginger-lime profile made it an enduring highball.",
    tips: [
      "Choose a ginger beer with strong spice and low sweetness.",
      "Use fresh lime juice instead of bottled lime flavoring.",
      "A copper mug keeps the drink feeling especially cold, but a highball glass works too.",
    ],
  },
  {
    id: "paloma",
    name: "Paloma",
    spirit: "Tequila",
    image: palomaImage,
    description:
      "A refreshing tequila highball built around grapefruit, lime, and sparkling soda.",
    ingredients: [
      "2 oz blanco tequila",
      "2 oz fresh grapefruit juice",
      "1/2 oz fresh lime juice",
      "1/2 oz agave syrup",
      "2 oz club soda",
      "Pinch of salt",
      "Grapefruit wedge",
    ],
    instructions: [
      "Add tequila, grapefruit juice, lime juice, agave, and salt to a shaker with ice.",
      "Shake briefly until chilled.",
      "Strain into a highball glass over fresh ice.",
      "Top with club soda and garnish with a grapefruit wedge.",
    ],
    pairings: ["Carnitas tacos", "Ceviche", "Grilled shrimp", "Chili-lime fruit"],
    difficulty: "Easy",
    glass: "Highball Glass",
    garnish: "Grapefruit Wedge",
    ice: "Cubed Ice",
    flavorProfile: ["Grapefruit", "Citrusy", "Refreshing", "Slightly Bitter"],
    story:
      "The Paloma is one of Mexico's most beloved tequila drinks. Grapefruit gives it a refreshing balance of sweetness, acidity, and gentle bitterness.",
    tips: [
      "A small pinch of salt makes the grapefruit taste brighter.",
      "Adjust agave depending on the sweetness of the grapefruit.",
      "For a simpler version, use a quality grapefruit soda instead of juice and club soda.",
    ],
  },
  {
    id: "tequila-sunrise",
    name: "Tequila Sunrise",
    spirit: "Tequila",
    image: tequilaSunriseImage,
    description:
      "A colorful tequila cocktail layered with orange juice and grenadine.",
    ingredients: [
      "2 oz blanco tequila",
      "4 oz fresh orange juice",
      "1/2 oz grenadine",
      "Orange slice and cherry",
    ],
    instructions: [
      "Fill a highball glass with ice.",
      "Add tequila and orange juice, then stir gently.",
      "Slowly pour grenadine down the inside of the glass so it sinks.",
      "Do not stir after adding grenadine.",
      "Garnish with an orange slice and cherry.",
    ],
    pairings: ["Breakfast tacos", "Grilled chicken", "Pork carnitas", "Fresh fruit"],
    difficulty: "Easy",
    glass: "Highball Glass",
    garnish: "Orange Slice and Cherry",
    ice: "Cubed Ice",
    flavorProfile: ["Fruity", "Citrusy", "Sweet", "Bright"],
    story:
      "The modern Tequila Sunrise became famous in the 1970s. Its name comes from the red-to-orange gradient formed when grenadine settles beneath the orange juice.",
    tips: [
      "Pour the grenadine slowly to preserve the sunrise effect.",
      "Use fresh orange juice for a brighter flavor.",
      "Serve before stirring so the layered colors remain visible.",
    ],
  },
  {
    id: "tommys-margarita",
    name: "Tommy's Margarita",
    spirit: "Tequila",
    image: tommysMargaritaImage,
    description:
      "A modern Margarita variation that replaces orange liqueur with agave syrup.",
    ingredients: [
      "2 oz blanco tequila",
      "1 oz fresh lime juice",
      "1/2 oz agave syrup",
      "Lime wheel",
      "Optional salt rim",
    ],
    instructions: [
      "Salt part of a rocks glass rim if desired.",
      "Add tequila, lime juice, and agave syrup to a shaker with ice.",
      "Shake until thoroughly chilled.",
      "Strain over fresh ice in the prepared glass.",
      "Garnish with a lime wheel.",
    ],
    pairings: ["Carne asada", "Guacamole", "Grilled shrimp", "Spicy street corn"],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "Lime Wheel",
    ice: "Cubed Ice",
    flavorProfile: ["Agave", "Citrusy", "Tart", "Clean"],
    story:
      "Tommy's Margarita was created at Tommy's Mexican Restaurant in San Francisco. Removing orange liqueur and using agave syrup places more attention on the tequila itself.",
    tips: [
      "Use a good blanco tequila because it is the center of the drink.",
      "Adjust agave syrup to match the acidity of your lime juice.",
      "A half-salted rim lets the drinker choose each sip.",
    ],
  },
];