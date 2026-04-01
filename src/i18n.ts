export type Language = 'en' | 'am' | 'om' | 'ti';

type Translations = {
  [key in Language]: Record<string, any>;
};

export const i18n: Translations = {
  en: {
    // Main Menu
    title: "ETHIOPIAN PHYSICS V2",
    subtitle: "Master the laws of nature.",
    playGame: "Play Game",
    levelSelect: "Level Select",
    leaderboard: "Leaderboard",
    
    // UI Overlay
    hint: "Hint",
    back: "Back",
    nextLevel: "Next Level",
    sandboxMode: "Sandbox Mode",
    sandboxDesc: "Experiment freely with physics objects.",
    sandboxHint: "Click to spawn objects. Have fun!",
    
    // Levels info
    level1Title: "1. Motion (Speed & Acceleration)",
    level1Desc: "Reach the green pad. Move: W/A/S/D. Sprint: Shift. Jump: Space. Pick up/Drop: E.",
    level1Hint: "Acceleration is the rate of change of velocity. Speed boosts will increase your acceleration!",
    
    level2Title: "2. Forces (Newton's Laws)",
    level2Desc: "Experiment with pushing the light and heavy boxes.",
    level2Hint: "F = ma. A heavier box requires more force to accelerate the same amount.",
    
    level3Title: "3. Gravity",
    level3Desc: "Jump across the platforms.",
    level3Hint: "Gravity pulls objects down at 9.8m/s². Watch out for the low-gravity zones!",

    level4Title: "4. Projectile Motion",
    level4Desc: "Click the red ball to launch it at the green target wall.",
    level4Hint: "The trajectory depends on the initial velocity and launch angle.",

    level5Title: "5. Friction",
    level5Desc: "Slide across the ice and sand surfaces to reach the goal.",
    level5Hint: "Sand has a high coefficient of friction, slowing you down quickly. Ice has almost none!",

    level6Title: "6. Kinematics (Moving Platforms)",
    level6Desc: "Time your jumps across the moving platforms.",
    level6Hint: "Pay attention to your relative velocity when jumping off a moving object.",

    level7Title: "7. Elasticity (Trampolines)",
    level7Desc: "Use the massive trampoline to reach the high goal.",
    level7Hint: "An elastic collision preserves kinetic energy, bouncing you high!",

    level8Title: "8. Puzzles (Mass Scaling)",
    level8Desc: "Push the 3 heavy blocks to build a staircase.",
    level8Hint: "Remember, heavier blocks are harder to push!",

    level9Title: "9. Energy (Pendulums)",
    level9Desc: "Dodge the massive swinging pendulums.",
    level9Hint: "A pendulum swings fastest at its lowest point.",

    level10Title: "10. The Gauntlet",
    level10Desc: "Survive the final exam.",
    level10Hint: "Combine everything you've learned. Good luck!",

    level11Title: "11. Torque & Balance (Seesaw)",
    level11Desc: "Cross the seesaw before it tips over.",
    level11Hint: "Keep your center of mass closer to the fulcrum to maintain balance!",

    level12Title: "12. Magnetism (Attraction)",
    level12Desc: "Watch the giant magnet attract the silver block. Try to pick the block up!",
    level12Hint: "Magnetic force follows the inverse-square law; the closer it gets, the stronger it pulls!",

    // Score / Quiz / Leaderboard / Registration
    levelComplete: "Level Complete!",
    time: "Time",
    stars: "Stars",
    backToMenu: "Back to Menu",
    quizTitle: "Physics Check!",
    submitBox: "Submit",
    register: "Register",
    enterUsername: "Enter your username",
    emptyLeaderboard: "No scores yet. Be the first!",
    selectLevel: "Select Level",
    levelWord: "Level",
    welcomePlayer: "Welcome Player",
    enterUsernameDesc: "Enter a username to track your progress on the global leaderboards.",
    usernamePlaceholder: "Username",
    bestTime: "Best Time",
    rating: "Rating",
    mainMenu: "Main Menu",
    nextLevelQuiz: "Next Level (Quiz)",
    finishBtn: "Finish",
    globalLeaderboards: "Global Leaderboards",
    rank: "Rank",
    usernameWord: "Username",
    totalTime: "Total Time",
    youWord: "(You)",
    quizDesc: "Answer this question to get 3 stars and unlock the next level!",
    trueAns: "True",
    falseAns: "False"
  },
  am: {
    title: "የኢትዮጵያ ፊዚክስ",
    subtitle: "የተፈጥሮ ሕጎችን ይመሩ።",
    playGame: "ጨዋታ ጀምር",
    levelSelect: "ደረጃ ምረጥ",
    leaderboard: "የመሪዎች ሰሌዳ",
    
    hint: "ፍንጭ",
    back: "ተመለስ",
    nextLevel: "ቀጣይ ደረጃ",
    sandboxMode: "የመለማመጃ ሁነታ",
    sandboxDesc: "በፊዚክስ አካላት በነጻነት ይሞክሩ።",
    sandboxHint: "ለመፍጠር ጠቅ ያድርጉ።",

    level1Title: "1. እንቅስቃሴ",
    level1Desc: "ወደ አረንጓዴው ቦታ ይድረሱ። ኳሱን ለማንቀሳቀስ W,A,S,D ይጠቀሙ።",
    level1Hint: "ፍጥነትዎን ለመጨመር የቀዩን መስመር ይጠቀሙ።",

    level2Title: "2. ኃይል (የኒውተን ሕግ)",
    level2Desc: "ቀላል እና ከባድ ሳጥኖችን በመግፋት ይሞክሩ።",
    level2Hint: "F=ma. ከባድ ሳጥን ተጨማሪ ኃይል ይፈልጋል።",

    level3Title: "3. ስበት (ግራቪቲ)",
    level3Desc: "በመድረኮቹ ላይ ይዝለሉ።",
    level3Hint: "ግራቪቲ ወደ ታች ይስባል። አነስተኛ ስበት ካላቸው ዞኖች ይጠንቀቁ!",

    level4Title: "4. ፕሮጀክታይል ሞሽን",
    level4Desc: "ቀዩን ኳስ ጠቅ በማድረግ ወደ አረንጓዴው ግድግዳ ይተኩሱት።",
    level4Hint: "አቅጣጫው በመነሻ ፍጥነት እና አንግል ላይ የተመሰረተ ነው።",

    level5Title: "5. ፍሪክሽን (ግጭት)",
    level5Desc: "ወደ መድረሻው ለመድረስ በበረዶ እና በአሸዋ ላይ ይንሸራተቱ።",
    level5Hint: "አሸዋ ፍጥነትን ይቀንሳል፣ በረዶ ግን አያደናቅፍም።",

    level6Title: "6. ኪነማቲክስ (ተንቀሳቃሽ መድረኮች)",
    level6Desc: "በእንቅስቃሴ ላይ ባሉ መድረኮች መካከል ይዝለሉ።",
    level6Hint: "ሲዘሉ አንጻራዊ ፍጥነትዎን ያስታውሱ።",

    level7Title: "7. ትራምፖሊን",
    level7Desc: "ትልቁን ትራምፖሊን ተጠቅመው ከፍታው ላይ ይድረሱ።",
    level7Hint: "ብልጫ ያለው መዝለል ተጠቅመው ከፍታው ላይ ይድረሱ።",

    level8Title: "8. ክብደት እና ድርድር",
    level8Desc: "3 ከባድ ሳጥኖችን በመግፋት ደረጃ ይስሩ።",
    level8Hint: "ከባድ ሳጥኖችን ለመግፋት አስቸጋሪ ናቸው።",

    level9Title: "9. ኢነርጂ (ፔንዱለም)",
    level9Desc: "የሚወዛወዙትን ፔንዱለሞች አምልጡ።",
    level9Hint: "ፔንዱለም ዝቅተኛው ቦታ ላይ በፍጥነት ይንቀሳቀሳል።",

    level10Title: "10. የመጨረሻ ፈተና",
    level10Desc: "ሁሉንም መሰናክሎች እለፉ።",
    level10Hint: "የተማሩትን ሁሉ ይጠቀሙ። መልካም ዕድል!",

    level11Title: "11. ቶርክ እና ሚዛን",
    level11Desc: "ሚዛኑን ሳትስቱ ማዶ ይሻገሩ።",
    level11Hint: "ሚዛን ለመጠበቅ ማዕከል ውስጥ ለመሆን ይሞክሩ።",

    level12Title: "12. ማግኔት",
    level12Desc: "ትልቁ ማግኔት የብር ሳጥኑን ሲስብ ይመልከቱ። ሳጥኑን ለማንሳት ይሞክሩ!",
    level12Hint: "በቀረቡ ቁጥር የመሳብ አቅሙ ይጨምራል።",

    levelComplete: "ደረጃውን ጨርሰዋል!",
    time: "ጊዜ",
    stars: "ኮከቦች",
    backToMenu: "ወደ ዋናው ገጽ",
    quizTitle: "የፊዚክስ ጥያቄ!",
    submitBox: "አስረክብ",
    register: "ተመዝገብ",
    enterUsername: "ስምዎን ያስገቡ",
    emptyLeaderboard: "ምንም ውጤት የለም!",
    selectLevel: "ደረጃ ምረጥ",
    levelWord: "ደረጃ",
    welcomePlayer: "እንኳን ደህና መጡ",
    enterUsernameDesc: "ውጤትዎን በዓለም አቀፍ ደረጃ ለመከታተል ስምዎን ያስገቡ።",
    usernamePlaceholder: "ስም",
    bestTime: "ምርጥ ሰዓት",
    rating: "ደረጃ",
    mainMenu: "ዋና ገጽ",
    nextLevelQuiz: "ቀጣይ ደረጃ (ፈተና)",
    finishBtn: "ጨርስ",
    globalLeaderboards: "የዓለም አቀፍ መሪዎች",
    rank: "ደረጃ",
    usernameWord: "ስም",
    totalTime: "አጠቃላይ ሰዓት",
    youWord: "(እርስዎ)",
    quizDesc: "3 ኮከቦችን ለማግኘት እና ቀጣዩን ደረጃ ለመክፈት ይህንን ጥያቄ ይመልሱ!",
    trueAns: "እውነት",
    falseAns: "ሐሰት"
  },
  om: {
    title: "FIZIKSII ITOOPHIYAA",
    subtitle: "Seera uumamaa hubadhu.",
    playGame: "Tapha Eegali",
    levelSelect: "Sadarkaa Filadhu",
    leaderboard: "Gabatee Dorgommii",
    
    hint: "Yaada",
    back: "Deebi'i",
    nextLevel: "Sadarkaa Itti Aanu",
    sandboxMode: "Haala Yaali",
    sandboxDesc: "Wantoota fiziksii waliin yaali.",
    sandboxHint: "Wantoota uumuuf cuqaasi.",

    level1Title: "1. Sochii (Saffisa)",
    level1Desc: "Bakka magariisa gahi. Socho'uuf W,A,S,D fayyadami.",
    level1Hint: "Saffisa dabaluuf sarara diimaa fayyadami.",

    level2Title: "2. Humna (Seera Niwuton)",
    level2Desc: "Saanduqa salphaa fi ulfaataa dhiibuun yaali.",
    level2Hint: "F=ma. Saanduqni ulfaataan humna dabalata barbaada.",

    level3Title: "3. Harkisa (Gravity)",
    level3Desc: "Bakka tokkoo gara biraatti utaali.",
    level3Hint: "Harkisni gara gadiit harkisa. Bakka harkisni xiqqaatu of eeggadhu!",

    level4Title: "4. Sochii Furguggee",
    level4Desc: "Kubbaa diimaa cuqaasuun gara dallaa magariisaatti darbadi.",
    level4Hint: "Kallattiin saffisa jalqabaa fi kofa irratti hundaa'a.",

    level5Title: "5. Rigata (Friction)",
    level5Desc: "Galma gahuuf cabbii fi ciracha irra mucucaadhu.",
    level5Hint: "Cirrachi saffisa hir'isa, cabbiin immoo ni saffisiisa.",

    level6Title: "6. Kinematiksi (Waltajjii Socho'u)",
    level6Desc: "Yeroo eeggachuun waltajjiiwwan socho'an irra utaali.",
    level6Hint: "Saffisa waltajjii sanaa yaadadhu.",

    level7Title: "7. Trampoline (Utaallaa)",
    level7Desc: "Trampoline fayyadamuun iddoo ol-aanaa gahi.",
    level7Hint: "Utaallaa dabalataa argachuuf giddutti sirriitti rukkuti.",

    level8Title: "8. Ulfaatina (Mass)",
    level8Desc: "Saanduqoota gugudaa 3 dhiibuun sadarkaa ijaari.",
    level8Hint: "Saanduqoota gugudaa dhiibuun ulfaataadha.",

    level9Title: "9. Inarjii (Pendulum)",
    level9Desc: "Pendulum socho'u irraa jalaa ba'i.",
    level9Hint: "Pendulumni gadi bu'aa yeroo ta'u baay'ee saffisa.",

    level10Title: "10. Qormaata Xumuraa",
    level10Desc: "Qormaata xumuraa darbi.",
    level10Hint: "Waan baratte hundumaa fayyadami. Carraa gaarii!",

    level11Title: "11. Madaallii (Seesaw)",
    level11Desc: "Madaallii eeggachuun ce'i.",
    level11Hint: "Madaallii eeguuf wiirtuu itti dhihaadhu.",

    level12Title: "12. Maagneetii",
    level12Desc: "Maagneetiin guddaan saanduqa meetii yoo harkisu daawwadhu. Saanduqicha kaasuf yaali!",
    level12Hint: "Yeroo itti dhihaattu humni harkisaa ni dabala.",

    levelComplete: "Sadarkaa Xumurameera!",
    time: "Yeroo",
    stars: "Urjiilee",
    backToMenu: "Gara Jalqabaatti",
    quizTitle: "Gaaffii Fiziksii!",
    submitBox: "Ergi",
    register: "Galmoofthu",
    enterUsername: "Maqaa kee galchi",
    emptyLeaderboard: "Bu'aan hin jiru!",
    selectLevel: "Sadarkaa Filadhu",
    levelWord: "Sadarkaa",
    welcomePlayer: "Baga Nagaan Dhuftan",
    enterUsernameDesc: "Kutaa kee addunyaa irratti hordofuuf maqaa kee galchi.",
    usernamePlaceholder: "Maqaa",
    bestTime: "Yeroo Gaarii",
    rating: "Sadarkaa",
    mainMenu: "Qabiyyee Guddaa",
    nextLevelQuiz: "Sadarkaa Itti Aanu (Qormaata)",
    finishBtn: "Xumuri",
    globalLeaderboards: "Gabatee Geggeessitoota Addunyaa",
    rank: "Sadarkaa",
    usernameWord: "Maqaa",
    totalTime: "Yeroo Waliigalaa",
    youWord: "(Si)",
    quizDesc: "Urjiilee 3 argachuuf fi sadarkaa itti aanu banuuf gaaffii kana deebisi!",
    trueAns: "Dhugaa",
    falseAns: "Soba"
  },
  ti: {
    title: "ፊዚክስ ኢትዮጵያ",
    subtitle: "ሕግታት ተፈጥሮ ምረሕ።",
    playGame: "ጸወታ ጀምር",
    levelSelect: "ደረጃ ምረጽ",
    leaderboard: "ሰሌዳ መራሕቲ",
    
    hint: "ሓበሬታ",
    back: "ተመለስ",
    nextLevel: "ቀጻሊ ደረጃ",
    sandboxMode: "ናይ መለማመዲ ኩነታት",
    sandboxDesc: "ብኣካላት ፊዚክስ ብነጻነት ፈትን።",
    sandboxHint: "ንምፍጣር ጠውቕ።",

    level1Title: "1. ምንቅስቓስ",
    level1Desc: "ናብቲ ቀጠልያ ቦታ ብጻሕ። W,A,S,D ተጠቐም።",
    level1Hint: "ፍጥነት ንምውሳኽ ነቲ ቀይሕ መስመር ተጠቐም።",

    level2Title: "2. ሓይሊ (ሕጊ ኒውተን)",
    level2Desc: "ቀሊልን ከቢድን ሳጹናት ብምድፋእ ፈትኑ።",
    level2Hint: "F=ma. ከቢድ ሳጹን ተወሳኺ ሓይሊ የድልዮ።",

    level3Title: "3. ስበት (ግራቪቲ)",
    level3Desc: "ኣብቶም መንገድታት ዘልል።",
    level3Hint: "ግራቪቲ ናብ ታሕቲ ይስሕብ።",

    level4Title: "4. ፕሮጀክታይል ሞሽን",
    level4Desc: "ነታ ቀያሕ ኩዕሶ ጠዊቕካ ናብቲ ሓምላይ መንደቕ ተኩሳ።",
    level4Hint: "ኣንፈቱ ኣብ መጀመርታ ፍጥነት ዝተመርኮሰ እዩ።",

    level5Title: "5. ፍሪክሽን (ግጭት)",
    level5Desc: "ናብ መወዳእታ ንምብጻሕ ኣብ በረድን ሑጻን መንሸራተት።",
    level5Hint: "ሑጻ ፍጥነት ይቕንስ፣ በረድ ግን ኣይዕግትን።",

    level6Title: "6. ኪነማቲክስ (ተንቀሳቐስቲ መድረኽ)",
    level6Desc: "ኣብቶም ዝንቀሳቐሱ መድረኻት ዘልል።",
    level6Hint: "ኣንጻራዊ ፍጥነትካ ዘክር።",

    level7Title: "7. ትራምፖሊን",
    level7Desc: "ትራምፖሊን ተጠቒምካ ላዕሊ ብጻሕ።",
    level7Hint: "ልዑል ዝላይ ተጠቐም።",

    level8Title: "8. ክብደት",
    level8Desc: "3 ከበድቲ ሳጹናት ብምድፋእ መደያይቦ ስራሕ።",
    level8Hint: "ከበድቲ ሳጹናት ንምድፋእ ኣጸገምቲ እዮም።",

    level9Title: "9. ኢነርጂ (ፔንዱለም)",
    level9Desc: "ካብቶም ዝወዛወዙ ፔንዱለማት ኣምልጥ።",
    level9Hint: "ፔንዱለም ኣብ ታሕቲ ብፍጥነት ይንቀሳቐስ።",

    level10Title: "10. ናይ መወዳእታ ፈተና",
    level10Desc: "ኩሉ ዕንቅፋታት ሕለፍ።",
    level10Hint: "ዝተምሃርካዮ ተጠቐም። ጽቡቕ ዕድል!",

    level11Title: "11. ቶርክን ሚዛንን",
    level11Desc: "ሚዛንካ ከይስሓትካ ስገር።",
    level11Hint: "ሚዛን ንምሕላው ኣብ ማእከል ኩን።",

    level12Title: "12. ማግኔት",
    level12Desc: "እቲ ዓቢ ማግኔት ነቲ ናይ ብሩር ሳጹን ክስሕቦ ተዓዘብ። ነቲ ሳጹን ንምልዓል ፈትን!",
    level12Hint: "ብዝቐረብካዮ መጠን ሓይሊ ስሕበት ይውስኽ።",

    levelComplete: "ደረጃ ዛዚምካ!",
    time: "ግዜ",
    stars: "ከዋኽብቲ",
    backToMenu: "ናብ መበገሲ",
    quizTitle: "ሕቶ ፊዚክስ!",
    submitBox: "ኣረክብ",
    register: "ተመዝገብ",
    enterUsername: "ስምካ ኣእቱ",
    emptyLeaderboard: "ዋላ ሓደ ውጽኢት የለን!",
    selectLevel: "ደረጃ ምረጽ",
    levelWord: "ደረጃ",
    welcomePlayer: "እንቋዕ ብድሓን መጹ",
    enterUsernameDesc: "ውጽኢትኩም ኣብ ዓለምለኻዊ ደረጃ ንምክትታል ስምኩም ኣእትዉ።",
    usernamePlaceholder: "ስም",
    bestTime: "ብሉጽ ግዜ",
    rating: "ደረጃ",
    mainMenu: "ቀንዲ ገጽ",
    nextLevelQuiz: "ቀጻሊ ደረጃ (ፈተና)",
    finishBtn: "ውዳእ",
    globalLeaderboards: "ዓለምለኻዊ ሰሌዳ መራሕቲ",
    rank: "ደረጃ",
    usernameWord: "ስም",
    totalTime: "ድምር ግዜ",
    youWord: "(ንስኹም)",
    quizDesc: "3 ከዋኽብቲ ንምርካብን ቀጻሊ ደረጃ ንምኽፋትን ነዚ ሕቶ ምለስ!",
    trueAns: "ሓቂ",
    falseAns: "ሓሶት"
  }
};

export const getTranslation = (lang: Language, key: string): string => {
  return i18n[lang]?.[key] || i18n['en'][key] || key;
};
