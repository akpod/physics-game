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


    level4Title: "4. Friction",
    level4Desc: "Slide across the ice and sand surfaces to reach the goal.",
    level4Hint: "Sand has a high coefficient of friction, slowing you down quickly. Ice has almost none!",

    level5Title: "5. Kinematics (Moving Platforms)",
    level5Desc: "Time your jumps across the moving platforms.",
    level5Hint: "Pay attention to your relative velocity when jumping off a moving object.",

    level6Title: "6. Elasticity (Trampolines)",
    level6Desc: "Use the massive trampoline to reach the high goal.",
    level6Hint: "An elastic collision preserves kinetic energy, bouncing you high!",

    level7Title: "7. Puzzles (Mass Scaling)",
    level7Desc: "Push the 3 heavy blocks to build a staircase.",
    level7Hint: "Remember, heavier blocks are harder to push!",

    level8Title: "8. Energy (Pendulums)",
    level8Desc: "Dodge the massive swinging pendulums.",
    level8Hint: "A pendulum swings fastest at its lowest point.",

    level9Title: "9. The Gauntlet",
    level9Desc: "Survive the final exam.",
    level9Hint: "Combine everything you've learned. Good luck!",

    level10Title: "10. Torque & Balance (Seesaw)",
    level10Desc: "Cross the seesaw before it tips over.",
    level10Hint: "Keep your center of mass closer to the fulcrum to maintain balance!",

    level11Title: "11. Magnetism (Attraction)",
    level11Desc: "Watch the giant magnet attract the silver block. Try to pick the block up!",
    level11Hint: "Magnetic force follows the inverse-square law; the closer it gets, the stronger it pulls!",

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
    falseAns: "False",

    q1Title: "What physical property are you increasing when holding sprint?",
    q1O1: "Mass",
    q1O2: "Velocity",
    q1O3: "Gravity",
    q1O4: "Volume",

    q2Title: "According to Newton's Second Law (F=ma), pushing the heavier box required:",
    q2O1: "Less Force",
    q2O2: "The Same Force",
    q2O3: "More Force",
    q2O4: "Zero Force",

    q3Title: "Did the heavier gravity pull you down faster than the normal gravity?",
    q3O1: "Yes, much faster",
    q3O2: "No, mass does not affect gravity",
    q3O3: "No, it pulled slower",
    q3O4: "Yes, because I'm heavy",

    q4Title: "What trajectory angle typically yields the maximum forward distance?",
    q4O1: "90 degrees",
    q4O2: "45 degrees",
    q4O3: "10 degrees",
    q4O4: "60 degrees",

    q5Title: "Why did you slide further on the white surface?",
    q5O1: "It had higher friction",
    q5O2: "It was magnetic",
    q5O3: "It had lower friction (Ice)",
    q5O4: "It was pushed by wind",

    q6Title: "Why do you move along with the moving platform without sliding off?",
    q6O1: "Friction locks your relative velocity",
    q6O2: "Magic",
    q6O3: "Magnets",
    q6O4: "You don't",

    q7Title: "What physical property characterizes a bouncy trampoline collision?",
    q7O1: "Inelastic",
    q7O2: "Elastic",
    q7O3: "Plastic",
    q7O4: "Frictional",

    q8Title: "According to Newton, pushing a heavy box requires a massive:",
    q8O1: "Applied Force",
    q8O2: "Normal Force",
    q8O3: "Tension",
    q8O4: "Buoyancy",

    q9Title: "In a swinging pendulum, where is the kinetic energy at its maximum?",
    q9O1: "At the highest point",
    q9O2: "At the lowest point",
    q9O3: "In the string",
    q9O4: "Never",

    q10Title: "What force ultimately pulls falling blocks back down to the ground?",
    q10O1: "Friction",
    q10O2: "Tension",
    q10O3: "Gravity",
    q10O4: "Normal Force"
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


    level4Title: "4. ፍሪክሽን (ግጭት)",
    level4Desc: "ወደ መድረሻው ለመድረስ በበረዶ እና በአሸዋ ላይ ይንሸራተቱ።",
    level4Hint: "አሸዋ ፍጥነትን ይቀንሳል፣ በረዶ ግን አያደናቅፍም።",

    level5Title: "5. ኪነማቲክስ (ተንቀሳቃሽ መድረኮች)",
    level5Desc: "በእንቅስቃሴ ላይ ባሉ መድረኮች መካከል ይዝለሉ።",
    level5Hint: "ሲዘሉ አንጻራዊ ፍጥነትዎን ያስታውሱ።",

    level6Title: "6. ትራምፖሊን",
    level6Desc: "ትልቁን ትራምፖሊን ተጠቅመው ከፍታው ላይ ይድረሱ።",
    level6Hint: "ብልጫ ያለው መዝለል ተጠቅመው ከፍታው ላይ ይድረሱ።",

    level7Title: "7. ክብደት እና ድርድር",
    level7Desc: "3 ከባድ ሳጥኖችን በመግፋት ደረጃ ይስሩ።",
    level7Hint: "ከባድ ሳጥኖችን ለመግፋት አስቸጋሪ ናቸው።",

    level8Title: "8. ኢነርጂ (ፔንዱለም)",
    level8Desc: "የሚወዛወዙትን ፔንዱለሞች አምልጡ።",
    level8Hint: "ፔንዱለም ዝቅተኛው ቦታ ላይ በፍጥነት ይንቀሳቀሳል።",

    level9Title: "9. የመጨረሻ ፈተና",
    level9Desc: "ሁሉንም መሰናክሎች እለፉ።",
    level9Hint: "የተማሩትን ሁሉ ይጠቀሙ። መልካም ዕድል!",

    level10Title: "10. ቶርክ እና ሚዛን",
    level10Desc: "ሚዛኑን ሳትስቱ ማዶ ይሻገሩ።",
    level10Hint: "ሚዛን ለመጠበቅ ማዕከል ውስጥ ለመሆን ይሞክሩ።",

    level11Title: "11. ማግኔት",
    level11Desc: "ትልቁ ማግኔት የብር ሳጥኑን ሲስብ ይመልከቱ። ሳጥኑን ለማንሳት ይሞክሩ!",
    level11Hint: "በቀረቡ ቁጥር የመሳብ አቅሙ ይጨምራል።",

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
    falseAns: "ሐሰት",

    q1Title: "ስፕሪንት (እርምጃ) ሲጠቀሙ የትኛውን የፊዚክስ ባህሪ ይጨምራሉ?",
    q1O1: "ክብደት (Mass)",
    q1O2: "ፍጥነት (Velocity)",
    q1O3: "ስበት (Gravity)",
    q1O4: "ይዘት (Volume)",

    q2Title: "በኒውተን ሁለተኛ ህግ (F=ma) መሰረት, ከባዱን ሳጥን ለመግፋት ምን አስፈለገ?",
    q2O1: "አነስተኛ ኃይል",
    q2O2: "እኩል ኃይል",
    q2O3: "ተጨማሪ ኃይል",
    q2O4: "ምንም ኃይል",

    q3Title: "ከፍተኛው ስበት ከመደበኛው ስበት ይልቅ በፍጥነት ወደ ታች ጎትቶዎታል?",
    q3O1: "አዎ፣ በጣም በፍጥነት",
    q3O2: "አይ፣ ክብደት ስበትን አይነካም",
    q3O3: "አይ፣ በዝግታ ነው የጎተተው",
    q3O4: "አዎ፣ ስለከበድኩ",

    q4Title: "ከፍተኛውን እርቀት ለመጓዝ የትኛው ማዕዘን (አንግል) ይመረጣል?",
    q4O1: "90 ዲግሪ",
    q4O2: "45 ዲግሪ",
    q4O3: "10 ዲግሪ",
    q4O4: "60 ዲግሪ",

    q5Title: "በነጩ ወለል ላይ ለምን ራቅ ብለው ተንሸራተቱ?",
    q5O1: "ከፍተኛ ግጭት (Friction) ስለነበረው",
    q5O2: "ማግኔት ስለነበረው",
    q5O3: "አነስተኛ ግጭት ስለነበረው (በረዶ)",
    q5O4: "በንፋስ ስለተገፋ",

    q6Title: "ከተንቀሳቃሽ መድረኩ ጋር አብረው ለምን ይንቀሳቀሳሉ?",
    q6O1: "ግጭት (Friction) አንፃራዊ ፍጥነትዎን ስለሚቆልፈው",
    q6O2: "አስማት",
    q6O3: "ማግኔት",
    q6O4: "አብሬ አልተንቀሳቀስኩም",

    q7Title: "የሚያዘልለውን ትራምፖሊን ግጭት የሚገልጸው የትኛው ነው?",
    q7O1: "ኢላስቲክ ያልሆነ (Inelastic)",
    q7O2: "ኢላስቲክ (Elastic)",
    q7O3: "ፕላስቲክ (Plastic)",
    q7O4: "ፍሪክሽናል (Frictional)",

    q8Title: "በኒውተን ህግ መሰረት፣ ከባድ ሳጥን ለመግፋት ምን ማዘጋጀት ያስፈልጋል?",
    q8O1: "የተተገበረ ኃይል (Applied Force)",
    q8O2: "መደበኛ ኃይል (Normal Force)",
    q8O3: "ውጥረት (Tension)",
    q8O4: "ተንሳፋፊነት (Buoyancy)",

    q9Title: "በሚወዛወዝ ፔንዱለም ውስጥ, ከፍተኛው የካይኔቲክ ኢነርጂ የት ይገኛል?",
    q9O1: "ከፍተኛው ቦታ ላይ",
    q9O2: "ዝቅተኛው ቦታ ላይ",
    q9O3: "በገመዱ ውስጥ",
    q9O4: "በጭራሽ",

    q10Title: "ከላይ የሚወድቁ ብሎኮችን ወደ መሬት የሚጎትተው ኃይል የትኛው ነው?",
    q10O1: "ፍሪክሽን (Friction)",
    q10O2: "ውጥረት (Tension)",
    q10O3: "ስበት (Gravity)",
    q10O4: "መደበኛ ኃይል (Normal Force)"
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


    level4Title: "4. Rigata (Friction)",
    level4Desc: "Galma gahuuf cabbii fi ciracha irra mucucaadhu.",
    level4Hint: "Cirrachi saffisa hir'isa, cabbiin immoo ni saffisiisa.",

    level5Title: "5. Kinematiksi (Waltajjii Socho'u)",
    level5Desc: "Yeroo eeggachuun waltajjiiwwan socho'an irra utaali.",
    level5Hint: "Saffisa waltajjii sanaa yaadadhu.",

    level6Title: "6. Trampoline (Utaallaa)",
    level6Desc: "Trampoline fayyadamuun iddoo ol-aanaa gahi.",
    level6Hint: "Utaallaa dabalataa argachuuf giddutti sirriitti rukkuti.",

    level7Title: "7. Ulfaatina (Mass)",
    level7Desc: "Saanduqoota gugudaa 3 dhiibuun sadarkaa ijaari.",
    level7Hint: "Saanduqoota gugudaa dhiibuun ulfaataadha.",

    level8Title: "8. Inarjii (Pendulum)",
    level8Desc: "Pendulum socho'u irraa jalaa ba'i.",
    level8Hint: "Pendulumni gadi bu'aa yeroo ta'u baay'ee saffisa.",

    level9Title: "9. Qormaata Xumuraa",
    level9Desc: "Qormaata xumuraa darbi.",
    level9Hint: "Waan baratte hundumaa fayyadami. Carraa gaarii!",

    level10Title: "10. Madaallii (Seesaw)",
    level10Desc: "Madaallii eeggachuun ce'i.",
    level10Hint: "Madaallii eeguuf wiirtuu itti dhihaadhu.",

    level11Title: "11. Maagneetii",
    level11Desc: "Maagneetiin guddaan saanduqa meetii yoo harkisu daawwadhu. Saanduqicha kaasuf yaali!",
    level11Hint: "Yeroo itti dhihaattu humni harkisaa ni dabala.",

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
    falseAns: "Soba",

    q1Title: "Yeroo fiigaa jirtu amala fiziksii kam guddisa?",
    q1O1: "Ulfaatina (Mass)",
    q1O2: "Saffisa (Velocity)",
    q1O3: "Harkisa (Gravity)",
    q1O4: "Qabiyyee (Volume)",

    q2Title: "Seera Niwuton Lammaffaa (F=ma) irratti hundaa'uun, saanduqa ulfaataa dhiibuun maal barbaada?",
    q2O1: "Humna Xiqqaa",
    q2O2: "Humna Walqixa",
    q2O3: "Humna Dabalataa",
    q2O4: "Humna Hin Barbaadu",

    q3Title: "Harkisni guddaan harkisa idilee caalaa saffisaan gara gadiitti si harkiseeraa?",
    q3O1: "Eeyyee, baay'ee saffisaan",
    q3O2: "Lakki, ulfaatinni harkisa hin jijjiiru",
    q3O3: "Lakki, suuta harkiseera",
    q3O4: "Eeyyee, waanan ulfaadhuuf",

    q4Title: "Fageenya dheeraa deemuuf kofa (angle) kamtu caalaatti filatama?",
    q4O1: "Digrii 90",
    q4O2: "Digrii 45",
    q4O3: "Digrii 10",
    q4O4: "Digrii 60",

    q5Title: "Maaliif lafa adii irra fageenyatti mucucaatte?",
    q5O1: "Rigata (Friction) guddaa waan qabuuf",
    q5O2: "Maagneetii waan ta'eef",
    q5O3: "Rigata xiqqaa waan qabuuf (Cabbii)",
    q5O4: "Qilleensaan waan dhiibameef",

    q6Title: "Waltajjii socho'aa wajjin maaliif waliin sochoote?",
    q6O1: "Rigatni (Friction) saffisa kee waan hidhuuf",
    q6O2: "Hojii Falfalaa (Magic)",
    q6O3: "Maagneetii",
    q6O4: "Waliin hin sochoone",

    q7Title: "Walitti bu'iinsa trampoline utaaluu amalli fiziksii isaa maali?",
    q7O1: "Elastikii kan hin taane (Inelastic)",
    q7O2: "Elastikii (Elastic)",
    q7O3: "Pilaastikii (Plastic)",
    q7O4: "Frikshiniidha (Frictional)",

    q8Title: "Akka seera Niwutonitti, saanduqa ulfaataa dhiibuuf maal barbaachisa?",
    q8O1: "Humna Itti Godhame (Applied Force)",
    q8O2: "Humna Idilee (Normal Force)",
    q8O3: "Mukuu (Tension)",
    q8O4: "Dandeettii bishaan irra tursiisuu (Buoyancy)",

    q9Title: "Pendulum socho'u keessatti, anniisaan kineetikii (kinetic energy) inni olaanaan eessatti argama?",
    q9O1: "Bakka baay'ee ol ka'aatti",
    q9O2: "Bakka baay'ee gadi bu'aatti",
    q9O3: "Funyocha keessatti",
    q9O4: "Gonkumaa",

    q10Title: "Humni xumura irratti blokoottan kufaa jiran gara lafaatti dhiibu maali?",
    q10O1: "Rigata (Friction)",
    q10O2: "Mukuu (Tension)",
    q10O3: "Harkisa (Gravity)",
    q10O4: "Humna Idilee (Normal Force)"
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


    level4Title: "4. ፍሪክሽን (ግጭት)",
    level4Desc: "ናብ መወዳእታ ንምብጻሕ ኣብ በረድን ሑጻን መንሸራተት።",
    level4Hint: "ሑጻ ፍጥነት ይቕንስ፣ በረድ ግን ኣይዕግትን።",

    level5Title: "5. ኪነማቲክስ (ተንቀሳቐስቲ መድረኽ)",
    level5Desc: "ኣብቶም ዝንቀሳቐሱ መድረኻት ዘልል።",
    level5Hint: "ኣንጻራዊ ፍጥነትካ ዘክር።",

    level6Title: "6. ትራምፖሊን",
    level6Desc: "ትራምፖሊን ተጠቒምካ ላዕሊ ብጻሕ።",
    level6Hint: "ልዑል ዝላይ ተጠቐም።",

    level7Title: "7. ክብደት",
    level7Desc: "3 ከበድቲ ሳጹናት ብምድፋእ መደያይቦ ስራሕ።",
    level7Hint: "ከበድቲ ሳጹናት ንምድፋእ ኣጸገምቲ እዮም።",

    level8Title: "8. ኢነርጂ (ፔንዱለም)",
    level8Desc: "ካብቶም ዝወዛወዙ ፔንዱለማት ኣምልጥ።",
    level8Hint: "ፔንዱለም ኣብ ታሕቲ ብፍጥነት ይንቀሳቐስ።",

    level9Title: "9. ናይ መወዳእታ ፈተና",
    level9Desc: "ኩሉ ዕንቅፋታት ሕለፍ።",
    level9Hint: "ዝተምሃርካዮ ተጠቐም። ጽቡቕ ዕድል!",

    level10Title: "10. ቶርክን ሚዛንን",
    level10Desc: "ሚዛንካ ከይስሓትካ ስገር።",
    level10Hint: "ሚዛን ንምሕላው ኣብ ማእከል ኩን።",

    level11Title: "11. ማግኔት",
    level11Desc: "እቲ ዓቢ ማግኔት ነቲ ናይ ብሩር ሳጹን ክስሕቦ ተዓዘብ። ነቲ ሳጹን ንምልዓል ፈትን!",
    level11Hint: "ብዝቐረብካዮ መጠን ሓይሊ ስሕበት ይውስኽ።",

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
    falseAns: "ሓሶት",

    q1Title: "ጉያ (Sprint) ኣብ ትጥቀመሉ ግዜ ኣየናይ ናይ ፊዚክስ ባህሪ ትውስኽ?",
    q1O1: "ክብደት (Mass)",
    q1O2: "ፍጥነት (Velocity)",
    q1O3: "ስበት (Gravity)",
    q1O4: "ዓቐን (Volume)",

    q2Title: "ብመሰረት ካልኣይ ሕጊ ኒውተን (F=ma)፡ ነቲ ከቢድ ሳጹን ንምድፋእ እንታይ የድሊ?",
    q2O1: "ውሑድ ሓይሊ",
    q2O2: "ማዕረ ሓይሊ",
    q2O3: "ተወሳኺ ሓይሊ",
    q2O4: "ዋላ ሓደ ሓይሊ",

    q3Title: "እቲ ዝዓበየ ስበት ካብቲ ንቡር ስበት ንላዕሊ ብፍጥነት ናብ ታሕቲ ስሒቡካ ድዩ?",
    q3O1: "እወ፣ ብዝተቐላጠፈ",
    q3O2: "ኣይኮነን: ክብደት ንስበት ኣይጸልዎን",
    q3O3: "ኣይኮነን: ብዝደኾመ ስሒቡ",
    q3O4: "እወ: ስለ ዝኸበድኩ",

    q4Title: "ዝለዓለ ርሕቀት ንምኻድ ኣየናይ ኩርናዕ (Angle) ይምረጽ?",
    q4O1: "90 ዲግሪ",
    q4O2: "45 ዲግሪ",
    q4O3: "10 ዲግሪ",
    q4O4: "60 ዲግሪ",

    q5Title: "ኣብቲ ጻዕዳ መሬት ስለምንታይ ርሒቕካ ተንሸራተትካ?",
    q5O1: "ልዑል ግጭት (Friction) ስለዝነበሮ",
    q5O2: "ማግኔት ስለዝነበሮ",
    q5O3: "ውሑድ ግጭት ስለዝነበሮ (በረድ)",
    q5O4: "ብንፋስ ስለዝተደፍአ",

    q6Title: "ምስቲ ዝንቀሳቐስ መድረኽ ስለምንታይ ሓቢርካ ትንቀሳቐስ?",
    q6O1: "ግጭት (Friction) ንኣንጻራዊ ፍጥነትካ ስለ ዝዓጽዎ",
    q6O2: "ማጂክ (Magic)",
    q6O3: "ማግኔት",
    q6O4: "ሓቢረ ኣይንቀሳቐስን",

    q7Title: "ናይ ዘላሊ ትራምፖሊን ግጭት ዝገልጽ ኣየናይ እዩ?",
    q7O1: "ኢላስቲክ ዘይኮነ (Inelastic)",
    q7O2: "ኢላስቲክ (Elastic)",
    q7O3: "ፕላስቲክ (Plastic)",
    q7O4: "ፍሪክሽናል (Frictional)",

    q8Title: "ብመሰረት ሕጊ ኒውተን: ከቢድ ሳጹን ንምድፋእ እንታይ የድሊ?",
    q8O1: "ዝተተግበረ ሓይሊ (Applied Force)",
    q8O2: "ንቡር ሓይሊ (Normal Force)",
    q8O3: "ስሕበት (Tension)",
    q8O4: "ተንሳፋፍነት (Buoyancy)",

    q9Title: "ኣብ ዝወዛወዝ ፔንዱለም: ዝለዓለ ካይነቲክ ኢነርጂ (Kinetic Energy) ኣበይ ይርከብ?",
    q9O1: "ኣብቲ ዝለዓለ ነጥቢ",
    q9O2: "ኣብቲ ዝተሓተ ነጥቢ",
    q9O3: "ኣብቲ ገመድ",
    q9O4: "ፈጺሙ",

    q10Title: "ነቶም ዝወድቑ ብሎካት ኣብ መወዳእታ ናብ መሬት ዝስሕቦም ሓይሊ እንታይ እዩ?",
    q10O1: "ግጭት (Friction)",
    q10O2: "ውጥረት (Tension)",
    q10O3: "ስበት (Gravity)",
    q10O4: "ንቡር ሓይሊ (Normal Force)"
  }
};

export const getTranslation = (lang: Language, key: string): string => {
  return i18n[lang]?.[key] || i18n['en'][key] || key;
};
