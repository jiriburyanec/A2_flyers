'use strict';
// Original practice content in the style of Cambridge A2 Flyers (not official exam material).

const VOCAB = [
  { id: 'animals', name: 'Animals', cz: 'Zvířata', icon: '🦅', words: [
    { en: 'beetle', cz: 'brouk', def: 'This is an insect with a hard, shiny back.' },
    { en: 'dinosaur', cz: 'dinosaurus', def: 'This very big animal lived on Earth millions of years ago.' },
    { en: 'eagle', cz: 'orel', def: 'This large bird has strong wings and can see very well.' },
    { en: 'insect', cz: 'hmyz', def: 'This small animal has six legs, and many of them can fly.' },
    { en: 'nest', cz: 'hnízdo', def: 'Birds make this and lay their eggs in it.' },
    { en: 'octopus', cz: 'chobotnice', def: 'This sea animal has eight long arms.' },
    { en: 'swan', cz: 'labuť', def: 'This big white bird has a long neck and swims on lakes.' },
    { en: 'tortoise', cz: 'želva', def: 'This slow animal carries its hard shell on its back.' },
    { en: 'wing', cz: 'křídlo', def: 'Birds and planes have two of these to help them fly.' },
    { en: 'fur', cz: 'srst', def: 'This is the soft hair that covers animals like cats and bears.' }
  ]},
  { id: 'health', name: 'Health & body', cz: 'Zdraví a tělo', icon: '🩺', words: [
    { en: 'ambulance', cz: 'sanitka', def: 'This takes people who are very ill to hospital.' },
    { en: 'chemist', cz: 'lékárna', def: 'You can buy medicine in this shop.' },
    { en: 'dentist', cz: 'zubař', def: 'This person looks after your teeth.' },
    { en: 'medicine', cz: 'lék', def: 'You take this when you are ill to help you feel better.' },
    { en: 'temperature', cz: 'teplota', def: 'When you are ill, this is often higher than normal.' },
    { en: 'shoulder', cz: 'rameno', def: 'This part of your body is between your neck and your arm.' },
    { en: 'stomach', cz: 'žaludek', def: 'Your food goes here after you eat it.' },
    { en: 'toothache', cz: 'bolest zubu', def: 'You have this when one of your teeth hurts.' },
    { en: 'knee', cz: 'koleno', def: 'This is in the middle of your leg and helps it bend.' },
    { en: 'cold', cz: 'rýma, nachlazení', def: 'When you have this, you sneeze and your nose is red.' }
  ]},
  { id: 'clothes', name: 'Clothes', cz: 'Oblečení', icon: '🧣', words: [
    { en: 'belt', cz: 'pásek', def: 'You wear this round your waist to stop your trousers falling down.' },
    { en: 'bracelet', cz: 'náramek', def: 'You wear this pretty thing round your arm.' },
    { en: 'gloves', cz: 'rukavice', def: 'You wear these on your hands when it is cold.' },
    { en: 'necklace', cz: 'náhrdelník', def: 'You wear this pretty thing round your neck.' },
    { en: 'pocket', cz: 'kapsa', def: 'This is part of your jacket or trousers where you can keep small things.' },
    { en: 'scarf', cz: 'šála', def: 'You wear this round your neck to keep warm.' },
    { en: 'uniform', cz: 'uniforma', def: 'Police officers and children at some schools wear these special clothes.' },
    { en: 'umbrella', cz: 'deštník', def: 'You hold this over your head when it is raining.' },
    { en: 'costume', cz: 'kostým', def: 'You wear this at a party when you want to look like someone else.' },
    { en: 'boots', cz: 'boty, holínky', def: 'You wear these on your feet when it is wet or snowy.' }
  ]},
  { id: 'food', name: 'Food & kitchen', cz: 'Jídlo a kuchyně', icon: '🍯', words: [
    { en: 'biscuit', cz: 'sušenka', def: 'This small sweet food is often eaten with a cup of tea.' },
    { en: 'butter', cz: 'máslo', def: 'You put this yellow food on bread.' },
    { en: 'flour', cz: 'mouka', def: 'You need this white powder to make bread and cakes.' },
    { en: 'honey', cz: 'med', def: 'Bees make this sweet food.' },
    { en: 'jam', cz: 'džem', def: 'This sweet food is made from fruit and you put it on bread.' },
    { en: 'pepper', cz: 'pepř', def: 'This black or white powder makes food hot.' },
    { en: 'salt', cz: 'sůl', def: 'This white food comes from the sea.' },
    { en: 'fork', cz: 'vidlička', def: 'You use this with a knife when you eat.' },
    { en: 'spoon', cz: 'lžíce', def: 'You use this to eat soup.' },
    { en: 'cooker', cz: 'sporák', def: 'You cook food on this in the kitchen.' }
  ]},
  { id: 'home', name: 'Home & things', cz: 'Domov a věci', icon: '🏠', words: [
    { en: 'shelf', cz: 'police', def: 'You can put books on this. It is on the wall.' },
    { en: 'stairs', cz: 'schody', def: 'You walk up these to go to the next floor.' },
    { en: 'roof', cz: 'střecha', def: 'This is the top part of a house.' },
    { en: 'lift', cz: 'výtah', def: 'This takes you up and down in a tall building.' },
    { en: 'key', cz: 'klíč', def: 'You need this to open or lock a door.' },
    { en: 'comb', cz: 'hřeben', def: 'You use this to make your hair tidy.' },
    { en: 'envelope', cz: 'obálka', def: 'You put a letter in this before you send it.' },
    { en: 'stamp', cz: 'známka', def: 'You put this on an envelope before you post it.' },
    { en: 'scissors', cz: 'nůžky', def: 'You use these to cut paper.' },
    { en: 'wallet', cz: 'peněženka', def: 'You keep your money in this.' }
  ]},
  { id: 'places', name: 'Places', cz: 'Místa', icon: '🏰', words: [
    { en: 'airport', cz: 'letiště', def: 'You go here when you want to travel by plane.' },
    { en: 'bank', cz: 'banka', def: 'People keep their money in this building.' },
    { en: 'castle', cz: 'hrad', def: 'Kings and queens lived in this big old building.' },
    { en: 'factory', cz: 'továrna', def: 'People make things like cars or chocolate in this building.' },
    { en: 'fire station', cz: 'hasičská stanice', def: 'Firefighters wait here with their fire engines.' },
    { en: 'hotel', cz: 'hotel', def: 'You can stay and sleep here when you are on holiday.' },
    { en: 'museum', cz: 'muzeum', def: 'You can see old and interesting things in this building.' },
    { en: 'post office', cz: 'pošta', def: 'You can buy stamps and send letters here.' },
    { en: 'university', cz: 'univerzita', def: 'Some students go here after they finish school.' },
    { en: 'restaurant', cz: 'restaurace', def: 'You can go here to eat a meal that someone cooks for you.' }
  ]},
  { id: 'jobs', name: 'Jobs', cz: 'Povolání', icon: '🧑‍🚀', words: [
    { en: 'astronaut', cz: 'astronaut', def: 'This person travels into space.' },
    { en: 'engineer', cz: 'inženýr', def: 'This person plans and builds things like bridges and machines.' },
    { en: 'firefighter', cz: 'hasič', def: 'This person stops fires.' },
    { en: 'journalist', cz: 'novinář', def: 'This person writes stories for a newspaper.' },
    { en: 'mechanic', cz: 'automechanik', def: 'This person repairs cars.' },
    { en: 'photographer', cz: 'fotograf', def: 'This person takes pictures with a camera.' },
    { en: 'pilot', cz: 'pilot', def: 'This person flies a plane.' },
    { en: 'waiter', cz: 'číšník', def: 'This person brings you food in a restaurant.' },
    { en: 'artist', cz: 'umělec', def: 'This person paints or draws pictures.' },
    { en: 'businessman', cz: 'podnikatel', def: 'This man works in an office and often travels to meetings.' }
  ]},
  { id: 'world', name: 'The world around us', cz: 'Svět kolem nás', icon: '🌍', words: [
    { en: 'desert', cz: 'poušť', def: 'This place is very dry and there is a lot of sand.' },
    { en: 'planet', cz: 'planeta', def: 'Earth and Mars are examples of this.' },
    { en: 'rocket', cz: 'raketa', def: 'Astronauts travel into space in this.' },
    { en: 'space', cz: 'vesmír', def: 'The stars and planets are in this.' },
    { en: 'island', cz: 'ostrov', def: 'This is land with water all around it.' },
    { en: 'forest', cz: 'les', def: 'There are a lot of trees in this place.' },
    { en: 'jungle', cz: 'džungle', def: 'This hot, wet forest has lots of plants and wild animals.' },
    { en: 'mountain', cz: 'hora', def: 'This is much higher than a hill.' },
    { en: 'river', cz: 'řeka', def: 'This long water goes to the sea.' },
    { en: 'moon', cz: 'měsíc (na obloze)', def: 'You can often see this in the sky at night.' }
  ]},
  { id: 'materials', name: 'Materials', cz: 'Materiály', icon: '🪵', words: [
    { en: 'glass', cz: 'sklo', def: 'Windows are made of this.' },
    { en: 'gold', cz: 'zlato', def: 'This yellow metal costs a lot of money.' },
    { en: 'metal', cz: 'kov', def: 'Cars and trains are made of this hard material.' },
    { en: 'plastic', cz: 'plast', def: 'Many bottles and toys are made of this.' },
    { en: 'silver', cz: 'stříbro', def: 'This grey metal is used to make rings and necklaces.' },
    { en: 'wood', cz: 'dřevo', def: 'This comes from trees.' },
    { en: 'wool', cz: 'vlna', def: 'Sheep give us this and we make warm sweaters from it.' },
    { en: 'paper', cz: 'papír', def: 'You write and draw on this.' }
  ]},
  { id: 'school', name: 'School & free time', cz: 'Škola a volný čas', icon: '📚', words: [
    { en: 'diary', cz: 'deník', def: 'You write what happens every day in this book.' },
    { en: 'dictionary', cz: 'slovník', def: 'You look in this book to find what a word means.' },
    { en: 'history', cz: 'dějepis', def: 'In this subject, you learn about people who lived a long time ago.' },
    { en: 'geography', cz: 'zeměpis', def: 'In this subject, you learn about countries, mountains and rivers.' },
    { en: 'science', cz: 'přírodní vědy', def: 'In this subject, you do experiments.' },
    { en: 'timetable', cz: 'rozvrh, jízdní řád', def: 'This tells you what time lessons or trains start.' },
    { en: 'competition', cz: 'soutěž', def: 'People try to win a prize in this.' },
    { en: 'magazine', cz: 'časopis', def: 'You can read this. It has lots of pictures and comes out every week or month.' },
    { en: 'tent', cz: 'stan', def: 'You sleep in this when you go camping.' },
    { en: 'skateboard', cz: 'skateboard', def: 'This has four wheels and you stand on it.' }
  ]}
];

// Reading & Writing Part 2: dialogue, choose A–H
const RW2 = [
  {
    title: 'Sam’s holiday',
    intro: 'Mrs Brown is talking to Sam about his holiday.',
    speakerA: 'Mrs Brown', speakerB: 'Sam',
    example: { q: 'Hello, Sam. Did you have a good holiday?', a: 'Yes, thanks. It was great!' },
    items: [
      { q: 'Where did you go?', a: 'We went to an island in Greece.' },
      { q: 'How did you get there?', a: 'We flew, and then we took a boat.' },
      { q: 'What was the weather like?', a: 'It was really hot and sunny every day.' },
      { q: 'What did you do there?', a: 'I swam in the sea every morning.' },
      { q: 'Would you like to go back there one day?', a: 'Yes, I’d love to. Maybe next summer!' }
    ],
    distractors: ['No, I’ve never been there.', 'Because it was raining.']
  },
  {
    title: 'Katy’s prize',
    intro: 'Katy is talking to her grandfather.',
    speakerA: 'Grandpa', speakerB: 'Katy',
    example: { q: 'What’s that in your hand, Katy?', a: 'It’s a prize. I won a competition at school!' },
    items: [
      { q: 'Well done! What kind of competition was it?', a: 'It was a story-writing competition.' },
      { q: 'What did you write about?', a: 'About a girl who travels to the moon.' },
      { q: 'How many people were in the competition?', a: 'About fifty children from different schools.' },
      { q: 'And what did you win?', a: 'This gold medal and some new books.' },
      { q: 'Are you going to enter again next year?', a: 'I hope so. I might write about dinosaurs!' }
    ],
    distractors: ['I don’t like reading very much.', 'It’s on Saturday afternoon.']
  }
];

// Reading & Writing Part 3: story with word box + title
const RW3 = [
  {
    text: [
      'Last Saturday, Jack and his dad went for a walk in the {0}. Jack wanted to take photos of birds, so he put his {1} in his backpack.',
      'After an hour, they {2} a strange noise. It came from a tall tree. Jack looked up and saw a big {3} at the top. Inside there were three baby eagles! They were {4} and they were waiting for their mother to bring food.',
      'Jack and his dad sat {5} behind a rock and waited. Then the mother eagle came back with a fish in her mouth. Jack took a great photo!'
    ],
    answers: ['forest', 'camera', 'heard', 'nest', 'hungry', 'quietly'],
    box: ['forest', 'camera', 'heard', 'nest', 'hungry', 'quietly', 'noisy', 'ate', 'river', 'wallet'],
    titles: ['Jack’s new backpack', 'A family of eagles', 'Dad goes fishing'],
    titleAnswer: 1
  },
  {
    text: [
      'Emma lives in a small town near the sea. Every summer, her uncle, who is a {0}, flies there in his small plane. This year, he {1} Emma to fly with him.',
      'Emma was a little {2} at first, but then she loved it! From the sky, the houses looked very {3} and the boats looked like toys. They flew over an {4} with lots of trees on it.',
      '‘Can we land there?’ asked Emma. ‘Not today,’ said her uncle. ‘But next time, I {5} we will!’'
    ],
    answers: ['pilot', 'invited', 'frightened', 'small', 'island', 'promise'],
    box: ['pilot', 'invited', 'frightened', 'small', 'island', 'promise', 'noisy', 'desert', 'forgot', 'slowly'],
    titles: ['Emma’s first flight', 'A day at the beach', 'Uncle’s new boat'],
    titleAnswer: 0
  }
];

// Reading & Writing Part 4: factual text, 3 options per gap (option[0] is correct)
const RW4 = [
  {
    title: 'Penguins',
    text: [
      'Penguins are birds, {0} they cannot fly. Most penguins live in very cold places, {1} there is a lot of ice and snow. They are {2} good swimmers and they use {3} wings to move quickly through the water.',
      'Penguins eat fish, and they {4} stay under the water for many minutes. {5} penguins are very small, but the emperor penguin is the {6} of all. It can be more {7} one metre tall!',
      'Penguin parents take turns to look {8} their eggs. When the baby penguins are born, they {9} soft grey feathers. Today, many penguins {10} in danger because the sea is getting warmer.'
    ],
    gaps: [
      ['but', 'so', 'because'],
      ['where', 'what', 'who'],
      ['very', 'much', 'many'],
      ['their', 'there', 'they'],
      ['can', 'must', 'does'],
      ['Some', 'Any', 'Every'],
      ['biggest', 'bigger', 'big'],
      ['than', 'that', 'then'],
      ['after', 'for', 'at'],
      ['have', 'has', 'having'],
      ['are', 'is', 'be']
    ]
  },
  {
    title: 'The moon',
    text: [
      'The moon is about 384,000 kilometres {0} Earth. It {1} much smaller than our planet. The moon does not make {2} own light – we can see it because light from the sun shines on it.',
      'There {3} no air on the moon, so people cannot breathe there. In 1969, two astronauts {4} on the moon for the first time. They {5} to wear special clothes.',
      'Because there is {6} wind or rain on the moon, their footprints are {7} there today! The moon goes {8} the Earth about once every 27 days. {9} people think that one day we will build houses on the moon. {10} you like to live there?'
    ],
    gaps: [
      ['from', 'to', 'of'],
      ['is', 'are', 'be'],
      ['its', 'it’s', 'it'],
      ['is', 'are', 'be'],
      ['walked', 'walk', 'walking'],
      ['had', 'have', 'has'],
      ['no', 'not', 'any'],
      ['still', 'yet', 'already'],
      ['round', 'through', 'along'],
      ['Some', 'Any', 'Every'],
      ['Would', 'Did', 'Was']
    ]
  }
];

// Reading & Writing Part 5: story + sentence completion (1–4 words)
const RW5 = [
  {
    title: 'The lost dog',
    story: [
      'Last Sunday morning, Peter and his sister Lily were playing in the park near their house when they saw a small brown dog. It was sitting under a bench and it looked sad. ‘I think it’s lost,’ said Lily. The dog had a blue collar, but there was no name on it. Peter gave the dog some of his sandwich, and it ate it very quickly. ‘It’s hungry too,’ he said.',
      'The children decided to take the dog home. Their mum looked at it carefully. ‘We must find its owner,’ she said. ‘Let’s make some posters.’ Peter drew a picture of the dog and Lily wrote ‘FOUND! Small brown dog with a blue collar’ under it. Then they put the posters on trees and in the windows of shops in their street.',
      'In the evening, the phone rang. It was an old man called Mr Green. ‘That’s my dog, Biscuit!’ he said. ‘He ran away when I was at the market.’ Half an hour later, Mr Green came to their house. Biscuit was very happy to see him and jumped up and down. Mr Green thanked the children and gave them a big box of chocolates.'
    ],
    example: { s: 'Peter and Lily were in the ___ when they saw the dog.', a: 'park' },
    items: [
      { s: 'The dog was sitting under ___ .', a: ['a bench', 'the bench', 'bench'] },
      { s: 'The colour of the dog’s collar was ___ .', a: ['blue'] },
      { s: 'Peter gave the dog part of ___ .', a: ['his sandwich', 'a sandwich', 'the sandwich'] },
      { s: 'The children’s mum wanted to find ___ .', a: ['its owner', 'the owner', 'the dog’s owner', 'the dogs owner', 'the dog\'s owner'] },
      { s: 'Lily wrote some words on ___ .', a: ['the posters', 'posters', 'the poster', 'a poster'] },
      { s: 'Mr Green lost his dog when he was at ___ .', a: ['the market', 'market'] },
      { s: 'Mr Green gave the children ___ .', a: ['a big box of chocolates', 'a box of chocolates', 'box of chocolates', 'chocolates', 'some chocolates'] }
    ]
  },
  {
    title: 'The school trip',
    story: [
      'Last month, Class 5 went on a school trip to the science museum in the city. They travelled there by train, and the journey took two hours. Harry sat next to his best friend, Zoe, and they played cards all the way.',
      'At the museum, a guide called Ms White showed them a room full of robots. One robot could talk and another one could draw pictures. Harry’s favourite was a robot that could play football! Then the children went into a dark room to learn about planets and stars. Zoe thought this was the most exciting part of the day.',
      'At lunchtime, they had their picnic in the garden behind the museum. Suddenly it started to rain, so they ran back inside. After lunch, everyone made a small rocket from paper and plastic bottles. Harry’s rocket flew higher than all the others, and he won a prize – a book about space. On the train home, he was so tired that he fell asleep.'
    ],
    example: { s: 'Class 5 visited a ___ in the city.', a: 'science museum' },
    items: [
      { s: 'The children went to the city by ___ .', a: ['train'] },
      { s: 'Harry and Zoe played ___ on the journey.', a: ['cards'] },
      { s: 'Ms White showed the children a room with lots of ___ .', a: ['robots'] },
      { s: 'Harry liked the robot that could ___ best.', a: ['play football'] },
      { s: 'Zoe enjoyed learning about ___ the most.', a: ['planets and stars', 'stars and planets'] },
      { s: 'The children had their picnic in the ___ behind the museum.', a: ['garden'] },
      { s: 'Harry’s prize was ___ .', a: ['a book about space', 'a space book', 'a book'] }
    ]
  }
];

// Reading & Writing Part 6: letter/diary, one word per gap, no word list
const RW6 = [
  {
    title: 'Lucy’s diary',
    text: [
      'Saturday 12th May',
      'Dear Diary,',
      'Today was my birthday! I am eleven {0} old now. In the morning, Mum and Dad gave me a new bike. It’s red and it’s much faster {1} my old one.',
      'In the afternoon, I had a party {2} my friends. We played games in the garden and {3} we ate a big chocolate cake. My grandma made it for {4}. It was the best cake I have {5} eaten!'
    ],
    example: 'years',
    answers: [['than'], ['with', 'for'], ['then', 'later'], ['me', 'us'], ['ever']]
  },
  {
    title: 'A letter from Scotland',
    text: [
      'Dear Ben,',
      'How {0} you? I’m writing to you {1} my holiday in Scotland. We are staying in a small hotel near {2} lake.',
      'Yesterday we climbed a mountain. It {3} very windy at the top, but the view was amazing! Tomorrow we are going {4} visit an old castle. I’ll send you some photos.',
      'See you {5}!',
      'Love, Mia'
    ],
    example: 'are',
    answers: [['from'], ['a', 'the'], ['was'], ['to'], ['soon', 'later']]
  }
];

// Reading & Writing Part 7: write a story (20+ words) about 3 pictures
const RW7 = [
  {
    title: 'At the beach',
    pictures: [
      { emoji: '🏖️👦🪣', hint: 'Chlapec si hraje na pláži.' },
      { emoji: '🌊😲🐬', hint: 'V moři uvidí delfína.' },
      { emoji: '📸😀👨‍👩‍👦', hint: 'Rodina ho fotí a je šťastná.' }
    ],
    model: 'Last summer, Tom was playing on the beach with his bucket. Suddenly he saw something in the sea. It was a dolphin! It was jumping out of the water. Tom’s dad took a photo of it and everyone was very happy.'
  },
  {
    title: 'The birthday cake',
    pictures: [
      { emoji: '🎂🏠👧', hint: 'Dívka má na stole narozeninový dort.' },
      { emoji: '🐕🎂😱', hint: 'Pes sní dort.' },
      { emoji: '🍕😂👨‍👩‍👧', hint: 'Rodina místo toho jí pizzu a směje se.' }
    ],
    model: 'It was Anna’s birthday and her mum made a big chocolate cake. Anna put it on the table and went to get some plates. When she came back, the dog was eating the cake! Anna was sad, but then Dad ordered a pizza and everybody laughed.'
  },
  {
    title: 'Camping',
    pictures: [
      { emoji: '⛺🌲👨‍👦', hint: 'Táta a syn stavějí stan v lese.' },
      { emoji: '🌧️⛈️⛺', hint: 'V noci přijde bouřka.' },
      { emoji: '🏠☕😊', hint: 'Jsou doma, pijí čaj a jsou rádi.' }
    ],
    model: 'Last weekend, Ben and his dad went camping in the forest. They put up their tent near a river. In the night, there was a terrible storm and the tent got very wet. In the morning, they drove home and drank hot tea. They were happy to be at home!'
  }
];

// Listening. Speakers: man, woman, boy, girl, narrator
const L1 = [
  {
    title: 'The party in the park',
    instr: 'Listen and draw lines. (Poslouchej a přiřaď jména k lidem na obrázku.)',
    cards: [
      { id: 'A', emoji: '👧📖' }, { id: 'B', emoji: '👦⚽' }, { id: 'C', emoji: '👨‍🍳🍕' }, { id: 'D', emoji: '👩🎸' },
      { id: 'E', emoji: '👴🐕' }, { id: 'F', emoji: '👦🚲' }, { id: 'G', emoji: '👩📷' }, { id: 'H', emoji: '👧🍦' }
    ],
    names: ['Robert', 'Sarah', 'Helen', 'David', 'Vicky', 'William', 'Emma'],
    example: { name: 'Robert', card: 'B' },
    answers: { Sarah: 'A', Helen: 'D', David: 'E', Vicky: 'G', William: 'F' },
    script: [
      { who: 'girl', text: 'Look at all these people at the party in the park!' },
      { who: 'man', text: 'Yes, it’s fun, isn’t it? Can you see the boy with the football? That’s Robert. He plays in the school team.' },
      { who: 'narrator', text: 'Can you see the line? This is an example. Now you listen and draw lines.' },
      { who: 'girl', text: 'Who’s the girl who’s eating an ice cream? Is that Sarah?' },
      { who: 'man', text: 'No, that’s Sarah’s cousin. Sarah is the girl who’s reading a book. She loves stories about dragons.' },
      { who: 'man', text: 'And can you see the woman with the guitar? She’s singing too.' },
      { who: 'girl', text: 'Oh yes. Who’s she?' },
      { who: 'man', text: 'That’s Helen. She’s a music teacher at my school.' },
      { who: 'girl', text: 'Who’s the old man with the dog?' },
      { who: 'man', text: 'His name’s David. He’s my grandfather’s friend. His dog is called Spot.' },
      { who: 'girl', text: 'And the woman who’s taking photos?' },
      { who: 'man', text: 'That’s Vicky. She works for a newspaper.' },
      { who: 'girl', text: 'And who’s the boy on the bike? He’s riding very fast!' },
      { who: 'man', text: 'That’s William. He wants to be a famous cyclist one day.' }
    ]
  }
];

const L2 = [
  {
    title: 'Summer camp',
    instr: 'Listen and write. There is one example. (Poslouchej a doplň slovo nebo číslo.)',
    formTitle: 'SUMMER CAMP – NEW STUDENT',
    example: { label: 'First name', a: 'Tom' },
    fields: [
      { label: 'Surname', a: ['Grant'] },
      { label: 'Age', a: ['11', 'eleven'] },
      { label: 'Favourite activity', a: ['sailing'] },
      { label: 'Must bring', a: ['a torch', 'torch'] },
      { label: 'Camp starts on', a: ['Tuesday'] }
    ],
    script: [
      { who: 'woman', text: 'Hello! Are you here for the summer camp?' },
      { who: 'boy', text: 'Yes, I am.' },
      { who: 'woman', text: 'Great. What’s your first name?' },
      { who: 'boy', text: 'Tom.' },
      { who: 'narrator', text: 'Can you see the answer? Now you listen and write.' },
      { who: 'woman', text: 'And what’s your surname, Tom?' },
      { who: 'boy', text: 'It’s Grant.' },
      { who: 'woman', text: 'How do you spell that?' },
      { who: 'boy', text: 'G. R. A. N. T.' },
      { who: 'woman', text: 'Thank you. And how old are you?' },
      { who: 'boy', text: 'I’m eleven. My sister is nine, but she isn’t coming to the camp.' },
      { who: 'woman', text: 'OK. What do you like doing best?' },
      { who: 'boy', text: 'I like climbing, but sailing is my favourite.' },
      { who: 'woman', text: 'Good! We go sailing on the lake every afternoon. And you must bring a torch, because we go for walks in the forest at night.' },
      { who: 'boy', text: 'A torch? OK. When does the camp start? On Monday?' },
      { who: 'woman', text: 'No, Monday is a holiday, so we start on Tuesday.' },
      { who: 'boy', text: 'Tuesday. Thank you!' }
    ]
  }
];

const L3 = [
  {
    title: 'Grandma’s birthday',
    instr: 'What did each person give Grandma? Listen and write a letter. (Co komu dal babičce? Napiš písmeno.)',
    cards: [
      { id: 'A', emoji: '🎸' }, { id: 'B', emoji: '📷' }, { id: 'C', emoji: '🚲' }, { id: 'D', emoji: '⌚' },
      { id: 'E', emoji: '📚' }, { id: 'F', emoji: '🎮' }, { id: 'G', emoji: '🧸' }, { id: 'H', emoji: '🪁' }
    ],
    names: ['Uncle Fred', 'Mary', 'Dad', 'Aunt Lucy', 'Peter', 'Mum'],
    example: { name: 'Uncle Fred', card: 'H' },
    answers: { 'Mary': 'D', 'Dad': 'B', 'Aunt Lucy': 'E', 'Peter': 'F', 'Mum': 'A' },
    script: [
      { who: 'boy', text: 'Grandma, what presents did everyone give you for your birthday?' },
      { who: 'woman', text: 'Well, your Uncle Fred gave me a kite! I want to fly it on the beach.' },
      { who: 'narrator', text: 'Can you see the letter H? Now you listen and write a letter in each box.' },
      { who: 'woman', text: 'Your cousin Mary gave me this lovely watch.' },
      { who: 'boy', text: 'It’s beautiful! What about Dad?' },
      { who: 'woman', text: 'He wanted to buy me a bike, but I said no! So he gave me a camera.' },
      { who: 'boy', text: 'And Aunt Lucy?' },
      { who: 'woman', text: 'Books, of course. She knows I love reading.' },
      { who: 'boy', text: 'Did Peter give you anything?' },
      { who: 'woman', text: 'Yes, a computer game! I’m not very good at it yet.' },
      { who: 'boy', text: 'And what did Mum give you?' },
      { who: 'woman', text: 'She gave me a guitar. I’d like to learn to play it.' }
    ]
  }
];

const L4 = [
  {
    title: 'Five short conversations',
    instr: 'Listen and tick the box. (Poslouchej a vyber správný obrázek.)',
    items: [
      {
        q: 'What did Jack have for lunch?',
        options: ['🍕', '🍝', '🥪'], a: 2,
        script: [
          { who: 'woman', text: 'Did you have pizza for lunch at school today, Jack?' },
          { who: 'boy', text: 'No, there wasn’t any pizza today. There was pasta, but I don’t like it, so I had a sandwich.' }
        ]
      },
      {
        q: 'What’s the weather going to be like tomorrow?',
        options: ['☀️', '🌧️', '❄️'], a: 1,
        script: [
          { who: 'girl', text: 'Is it going to snow tomorrow, Dad?' },
          { who: 'man', text: 'No, it’s too warm for snow. The radio says it’s going to rain all day.' },
          { who: 'girl', text: 'Oh no! I wanted to play outside in the sun.' }
        ]
      },
      {
        q: 'How will Katy get to the museum?',
        options: ['🚌', '🚲', '🚗'], a: 0,
        script: [
          { who: 'man', text: 'Are you going to cycle to the museum, Katy?' },
          { who: 'girl', text: 'No, it’s too far. And Mum can’t drive me because she’s working, so I’ll take the bus.' }
        ]
      },
      {
        q: 'What time does the film start?',
        options: ['🕡 6:45', '🕖 7:15', '🕗 7:45'], a: 1,
        script: [
          { who: 'boy', text: 'Does the film start at a quarter to seven?' },
          { who: 'woman', text: 'No, that was yesterday. Today it starts at a quarter past seven. We need to leave the house at half past six.' }
        ]
      },
      {
        q: 'What is Sam’s mum’s job?',
        options: ['👩‍⚕️', '👩‍🏫', '👩‍✈️'], a: 2,
        script: [
          { who: 'girl', text: 'Is your mum a doctor, Sam?' },
          { who: 'boy', text: 'No, my aunt is a doctor. My mum’s a pilot. She flies to lots of different countries.' }
        ]
      }
    ]
  }
];

const L5 = [
  {
    title: 'At the lake',
    instr: 'Listen and colour and write. (Poslouchej, vybarvi a napiš.)',
    objects: [
      { id: 'bird', emoji: '🐦' }, { id: 'boat', emoji: '⛵' }, { id: 'kite', emoji: '🪁' }, { id: 'sign', emoji: '🪧' },
      { id: 'bike', emoji: '🚲' }, { id: 'basket', emoji: '🧺' }, { id: 'tree', emoji: '🌳' }, { id: 'duck', emoji: '🦆' }
    ],
    colours: ['red', 'blue', 'green', 'yellow', 'brown', 'purple', 'orange', 'pink', 'grey', 'black'],
    example: { type: 'colour', object: 'bird', value: 'yellow' },
    tasks: [
      { type: 'colour', object: 'kite', value: 'red' },
      { type: 'write', object: 'sign', value: 'boats' },
      { type: 'colour', object: 'bike', value: 'green' },
      { type: 'colour', object: 'basket', value: 'purple' },
      { type: 'write', object: 'boat', value: 'anna' }
    ],
    script: [
      { who: 'man', text: 'Look at this picture of the lake. Would you like to colour it?' },
      { who: 'girl', text: 'Yes, please!' },
      { who: 'man', text: 'Can you see the bird on the tree? Colour it yellow.' },
      { who: 'narrator', text: 'Can you see the yellow bird? This is an example. Now you listen and colour and write.' },
      { who: 'girl', text: 'What next?' },
      { who: 'man', text: 'Find the kite. It’s flying over the water. Colour that kite red.' },
      { who: 'girl', text: 'Red. OK, I’ve done that.' },
      { who: 'man', text: 'Now, there’s a sign next to the lake. Write the word BOATS on the sign.' },
      { who: 'girl', text: 'B. O. A. T. S?' },
      { who: 'man', text: 'That’s right.' },
      { who: 'girl', text: 'Can I colour the bike?' },
      { who: 'man', text: 'Yes. Colour the bike green, please.' },
      { who: 'girl', text: 'Green. OK!' },
      { who: 'man', text: 'Now look at the basket under the tree. Colour it purple.' },
      { who: 'girl', text: 'Purple is my favourite colour!' },
      { who: 'man', text: 'And finally, write a name on the boat. Write ANNA.' },
      { who: 'girl', text: 'A. N. N. A. Done! It looks great.' }
    ]
  }
];

// Speaking
const SP1 = [
  {
    title: 'In the kitchen',
    instr: 'Examiner říká věty o svém obrázku. Tvůj obrázek je trochu jiný – řekni, co je jinak.',
    items: [
      { examiner: 'In my picture, there are three cups on the table.', mine: '☕☕ 2 cups', model: 'In my picture, there are two cups.' },
      { examiner: 'In my picture, the cat is sleeping.', mine: '🐈🍽️ the cat is eating', model: 'In my picture, the cat is eating.' },
      { examiner: 'In my picture, the clock says four o’clock.', mine: '🕘 nine o’clock', model: 'In my picture, it’s nine o’clock.' },
      { examiner: 'In my picture, the woman is wearing a long dress.', mine: '👩👖 trousers', model: 'In my picture, the woman is wearing trousers.' },
      { examiner: 'In my picture, the window is open.', mine: '🪟 closed', model: 'In my picture, the window is closed.' },
      { examiner: 'In my picture, the boy is drinking milk.', mine: '👦🧃 orange juice', model: 'In my picture, the boy is drinking orange juice.' }
    ]
  }
];

const SP2 = [
  {
    title: 'School trips',
    instr: 'Nejdřív odpovídej na otázky o Harryho výletu (máš kartičku). Pak se ptej examinera na Katyin výlet.',
    otherTitle: 'Katy’s school trip',
    myCard: { title: 'Harry’s school trip', rows: [['Where', 'the zoo'], ['When', 'last Friday'], ['How', 'by bus'], ['Best animal', 'elephants'], ['Weather', 'sunny']] },
    examinerAsks: [
      { q: 'Where did Harry go on his school trip?', a: 'He went to the zoo.' },
      { q: 'When did he go?', a: 'Last Friday.' },
      { q: 'How did he get there?', a: 'By bus.' },
      { q: 'Which animals did he like best?', a: 'The elephants.' },
      { q: 'What was the weather like?', a: 'It was sunny.' }
    ],
    youAsk: [
      { prompt: 'Where?', q: 'Where did Katy go on her school trip?', a: 'She went to a castle.' },
      { prompt: 'When?', q: 'When did she go?', a: 'Last Wednesday.' },
      { prompt: 'How?', q: 'How did she get there?', a: 'By train.' },
      { prompt: 'Best thing?', q: 'What did she like best?', a: 'The old swords.' },
      { prompt: 'Weather?', q: 'What was the weather like?', a: 'It was cold and windy.' }
    ]
  }
];

const SP3 = [
  {
    title: 'Ben’s kite',
    instr: 'Examiner řekne první obrázek. Ty pokračuj v příběhu – ke každému obrázku 1–2 věty.',
    panels: [
      { emoji: '👨‍👦🪁🌬️', text: 'It’s a windy day. Ben and his dad are going to the park with Ben’s new kite.' },
      { emoji: '🪁☁️😀', text: 'The kite is flying very high. Ben is very happy.' },
      { emoji: '🌳🪁😟', text: 'Oh no! The kite is stuck in a tall tree. Ben is sad.' },
      { emoji: '👨🪜🪁', text: 'A man with a ladder climbs up the tree and gets the kite.' },
      { emoji: '🍦😊👨‍👦', text: 'Ben says thank you. Then Ben and his dad buy ice creams.' }
    ]
  },
  {
    title: 'The surprise',
    instr: 'Examiner řekne první obrázek. Ty pokračuj v příběhu – ke každému obrázku 1–2 věty.',
    panels: [
      { emoji: '👧📅🎁', text: 'Today is Mum’s birthday. Lucy wants to make a surprise for her.' },
      { emoji: '👧🥣🥚', text: 'Lucy is making a cake in the kitchen. She’s mixing eggs and flour.' },
      { emoji: '🎂🔥😱', text: 'The cake is in the oven too long and it’s burning! There’s smoke everywhere.' },
      { emoji: '👧🌸✂️', text: 'Lucy has a new idea. She’s picking flowers in the garden.' },
      { emoji: '👩💐😍', text: 'Mum comes home. Lucy gives her the flowers and Mum is very happy.' }
    ]
  }
];

const SP4 = [
  { q: 'Tell me about your school.', model: 'My school is quite big and it’s near my house. I’m in class five. My favourite subject is science because we do experiments.' },
  { q: 'What’s your favourite subject? Why?', model: 'My favourite subject is art because I love drawing and painting.' },
  { q: 'How do you get to school?', model: 'I usually walk to school with my friend, but when it rains, my mum drives me.' },
  { q: 'Tell me about your family.', model: 'There are four people in my family: my mum, my dad, my little brother and me. We’ve also got a dog.' },
  { q: 'What did you do last weekend?', model: 'Last weekend I visited my grandparents. We went for a walk in the forest and had lunch together.' },
  { q: 'What are you going to do next weekend?', model: 'Next weekend I’m going to play football with my friends and go to the cinema.' },
  { q: 'When is your birthday? What do you usually do on your birthday?', model: 'My birthday is in May. I usually have a party with my friends and we eat a big cake.' },
  { q: 'What do you like doing in your free time?', model: 'In my free time I like reading books and riding my bike.' },
  { q: 'Tell me about your best friend.', model: 'My best friend is called Eva. She’s funny and kind. We sit next to each other at school.' },
  { q: 'Where did you go on holiday last summer?', model: 'Last summer we went to Croatia. We swam in the sea every day and ate lots of ice cream.' },
  { q: 'What would you like to be when you grow up? Why?', model: 'I’d like to be a vet because I love animals and I want to help them.' },
  { q: 'Have you got any pets? Tell me about them.', model: 'Yes, I’ve got a cat. She’s black and white and she sleeps on my bed.' },
  { q: 'What do you usually have for breakfast?', model: 'I usually have bread with butter and honey, and a glass of milk.' },
  { q: 'Have you ever been to another country?', model: 'Yes, I have. I’ve been to Austria and Italy. I liked Italy best because of the pizza!' },
  { q: 'What’s the weather like today?', model: 'It’s cloudy and a bit cold today, but it isn’t raining.' }
];

// Grammar reference (Czech explanations) + mini quizzes (option[0] is correct)
const GRAMMAR = [
  {
    title: 'Past simple × past continuous',
    cz: 'Past continuous (was/were + -ing) popisuje děj, který právě probíhal v minulosti. Past simple popisuje krátký, ukončený děj. Často spolu: děj probíhal (past continuous), když se něco stalo (past simple).',
    examples: ['I was reading when the phone rang.', 'While we were walking home, it started to rain.'],
    quiz: [
      { q: 'I ___ TV when you called.', o: ['was watching', 'watched', 'am watching'] },
      { q: 'While we ___ in the park, it started to rain.', o: ['were walking', 'walked', 'are walking'] },
      { q: 'What ___ you doing at 8 o’clock yesterday?', o: ['were', 'did', 'are'] },
      { q: 'She ___ her leg when she was skiing.', o: ['broke', 'was breaking', 'breaks'] }
    ]
  },
  {
    title: 'Present perfect (ever, never, just, already, yet)',
    cz: 'Have/has + 3. tvar slovesa. Používá se pro zkušenosti (Have you ever…?), pro věci, které se právě staly (just), a s already (už) / yet (už – v otázce, ještě – v záporu).',
    examples: ['Have you ever been to London?', 'I’ve just finished my homework.', 'She hasn’t eaten her lunch yet.'],
    quiz: [
      { q: 'Have you ever ___ a camel?', o: ['ridden', 'rode', 'ride'] },
      { q: 'I’ve ___ finished my homework. Can I go out?', o: ['already', 'yet', 'ever'] },
      { q: 'She hasn’t eaten her lunch ___.', o: ['yet', 'already', 'just'] },
      { q: 'We ___ to Paris three times.', o: ['have been', 'were going', 'has been'] }
    ]
  },
  {
    title: 'Budoucnost: will × going to',
    cz: 'Going to – plány a věci, které jsou „vidět“ (Look at the clouds! It’s going to rain.). Will – předpovědi, názory (I think…), okamžitá rozhodnutí. Přítomný průběhový čas – domluvené plány.',
    examples: ['I’m going to visit my grandma next week.', 'I think it will be sunny tomorrow.', 'The phone’s ringing. I’ll answer it!'],
    quiz: [
      { q: 'Look at those black clouds! It ___ rain.', o: ['is going to', 'will to', 'going'] },
      { q: 'I think people ___ live on Mars one day.', o: ['will', 'are', 'going'] },
      { q: 'We ___ Grandma on Saturday. We’ve bought the train tickets.', o: ['are visiting', 'visit', 'visited'] },
      { q: '‘The phone’s ringing.’ ‘I ___ answer it!’', o: ['’ll', '’m going', 'going to'] }
    ]
  },
  {
    title: 'Modální slovesa: might, must, should, could',
    cz: 'Might/may = možná. Must = musím (pravidlo). Mustn’t = nesmím. Should = měl bys (rada). Could = mohl/uměl (v minulosti), nebo zdvořilá prosba.',
    examples: ['Take an umbrella. It might rain.', 'You mustn’t run in the classroom.', 'You should go to the dentist.', 'I could swim when I was five.'],
    quiz: [
      { q: 'Take an umbrella. It ___ rain later.', o: ['might', 'must', 'mustn’t'] },
      { q: 'You ___ wear a helmet when you ride a bike. It’s the rule.', o: ['must', 'might', 'could'] },
      { q: 'You look tired. You ___ go to bed early.', o: ['should', 'mustn’t', 'can’t'] },
      { q: 'When I was three, I ___ swim.', o: ['couldn’t', 'can’t', 'mustn’t'] }
    ]
  },
  {
    title: 'Stupňování přídavných jmen',
    cz: 'Krátká slova: -er / the -est (big – bigger – the biggest). Dlouhá slova: more / the most (more expensive). Nepravidelná: good – better – best, bad – worse – worst, far – further – furthest. Srovnání: than.',
    examples: ['An elephant is bigger than a horse.', 'This is the most beautiful picture.', 'My test was worse than yours.'],
    quiz: [
      { q: 'An elephant is ___ than a horse.', o: ['bigger', 'biggest', 'more big'] },
      { q: 'This is the ___ film I’ve ever seen!', o: ['best', 'better', 'good'] },
      { q: 'My new bike is ___ than my old one.', o: ['more expensive', 'expensiver', 'most expensive'] },
      { q: 'Tom runs ___ than Ben.', o: ['faster', 'fastest', 'more fast'] }
    ]
  },
  {
    title: 'Tázací dovětky (question tags)',
    cz: 'Kladná věta → záporný dovětek, záporná věta → kladný dovětek. Použij stejné pomocné sloveso (is, do, can, did…). Znamená „že?“, „viď?“.',
    examples: ['It’s cold today, isn’t it?', 'You don’t like fish, do you?', 'They went to the zoo, didn’t they?'],
    quiz: [
      { q: 'It’s cold today, ___?', o: ['isn’t it', 'is it', 'doesn’t it'] },
      { q: 'You like pizza, ___?', o: ['don’t you', 'do you', 'aren’t you'] },
      { q: 'She can swim, ___?', o: ['can’t she', 'can she', 'doesn’t she'] },
      { q: 'They went to the zoo, ___?', o: ['didn’t they', 'don’t they', 'weren’t they'] }
    ]
  },
  {
    title: 'Vztažné věty: who, which, where',
    cz: 'Who = lidé (který/která – o člověku). Which (nebo that) = věci a zvířata. Where = místa. Velmi časté v Part 1 (definice): „This person who…“.',
    examples: ['A pilot is a person who flies a plane.', 'This is the book which I bought yesterday.', 'That’s the house where I live.'],
    quiz: [
      { q: 'That’s the girl ___ won the competition.', o: ['who', 'which', 'where'] },
      { q: 'This is the museum ___ we saw the dinosaurs.', o: ['where', 'who', 'which'] },
      { q: 'I’ve lost the book ___ you gave me.', o: ['which', 'who', 'where'] },
      { q: 'A dentist is a person ___ looks after your teeth.', o: ['who', 'which', 'where'] }
    ]
  },
  {
    title: 'Spojky: because, so, if, when, before, after',
    cz: 'Because = protože (důvod). So = takže (následek). If = jestli/pokud (podmínka; po if v budoucnosti používáme přítomný čas!). When = když. Before / after = před / po.',
    examples: ['If it rains tomorrow, we’ll stay at home.', 'I was hungry, so I made a sandwich.', 'Wash your hands before you eat.'],
    quiz: [
      { q: 'I’ll call you ___ I get home.', o: ['when', 'so', 'but'] },
      { q: '___ it rains tomorrow, we’ll stay at home.', o: ['If', 'Because', 'So'] },
      { q: 'I was hungry, ___ I made a sandwich.', o: ['so', 'because', 'but'] },
      { q: 'We stayed inside ___ it was raining.', o: ['because', 'so', 'if'] }
    ]
  },
  {
    title: 'Slovesné vazby: -ing × to',
    cz: 'Po enjoy, like, love, hate, stop, be good at → -ing (I enjoy swimming). Po want, would like, decide, need, learn → to + sloveso (I want to go). Po let’s, can, must → jen sloveso (Let’s go!).',
    examples: ['I enjoy swimming.', 'She’s good at drawing.', 'Do you want to come?', 'Let’s make a cake!'],
    quiz: [
      { q: 'I enjoy ___ in the sea.', o: ['swimming', 'swim', 'to swimming'] },
      { q: 'Do you want ___ to the cinema?', o: ['to go', 'going', 'go'] },
      { q: 'She’s good at ___ pictures.', o: ['drawing', 'draw', 'to draw'] },
      { q: 'Let’s ___ a cake!', o: ['make', 'to make', 'making'] }
    ]
  }
];

/* ---------- Additional sets ---------- */

VOCAB.push(
  { id: 'transport', name: 'Transport & travel', cz: 'Doprava a cestování', icon: '🚁', words: [
    { en: 'motorbike', cz: 'motorka', def: 'This has two wheels and an engine.' },
    { en: 'helicopter', cz: 'vrtulník', def: 'This can fly, but it has no wings. It can go straight up.' },
    { en: 'passenger', cz: 'cestující', def: 'This person travels in a car, bus or plane but doesn’t drive it.' },
    { en: 'ticket', cz: 'jízdenka, lístek', def: 'You need this to travel on a train or to see a film.' },
    { en: 'station', cz: 'nádraží', def: 'You wait here for a train.' },
    { en: 'taxi', cz: 'taxi', def: 'You pay the driver of this car to take you somewhere.' },
    { en: 'lorry', cz: 'nákladní auto', def: 'This big vehicle carries heavy things from place to place.' },
    { en: 'motorway', cz: 'dálnice', def: 'This is a big, fast road between cities.' },
    { en: 'journey', cz: 'cesta', def: 'You go on this when you travel from one place to another.' },
    { en: 'traffic', cz: 'provoz, doprava', def: 'This is all the cars and buses on the road.' }
  ]},
  { id: 'weather', name: 'Weather & time', cz: 'Počasí a čas', icon: '🌈', words: [
    { en: 'storm', cz: 'bouře', def: 'In this weather there is strong wind and heavy rain.' },
    { en: 'fog', cz: 'mlha', def: 'When there is this, it is difficult to see far.' },
    { en: 'ice', cz: 'led', def: 'Water becomes this when it is very cold.' },
    { en: 'rainbow', cz: 'duha', def: 'You can sometimes see this in the sky when the sun shines after rain.' },
    { en: 'lightning', cz: 'blesk', def: 'This bright light in the sky comes in a storm.' },
    { en: 'cloud', cz: 'mrak', def: 'This white or grey thing in the sky can bring rain.' },
    { en: 'autumn', cz: 'podzim', def: 'In this season, the leaves fall from the trees.' },
    { en: 'calendar', cz: 'kalendář', def: 'This shows you all the days and months of the year.' },
    { en: 'century', cz: 'století', def: 'This is one hundred years.' },
    { en: 'midnight', cz: 'půlnoc', def: 'It is twelve o’clock at night.' }
  ]}
);

RW2.push({
  title: 'The new sports club',
  intro: 'Holly is talking to her friend Robert.',
  speakerA: 'Holly', speakerB: 'Robert',
  example: { q: 'Hi, Robert! Where are you going?', a: 'To the new sports club in the park.' },
  items: [
    { q: 'What can you do there?', a: 'You can play tennis or go climbing.' },
    { q: 'How much does it cost?', a: 'It’s free for children on Saturdays.' },
    { q: 'Who are you going with?', a: 'My cousin Daniel. He’s coming by bike.' },
    { q: 'What time does it close?', a: 'At six o’clock in the evening.' },
    { q: 'Can I come with you?', a: 'Of course! Bring your trainers.' }
  ],
  distractors: ['I’ve never played chess.', 'Because I’m hungry.']
});

RW3.push({
  text: [
    'Olivia’s class had a {0} competition at school last week. Everybody had to build a machine. Olivia {1} a small robot from old boxes and bottles. It could move its arms and say ‘Hello!’',
    'On the day of the competition, Olivia was very {2}. When it was her turn, she pressed the button, but nothing happened! ‘Oh no, my {3} isn’t working!’ she said.',
    'Her teacher found the problem – a wire wasn’t in the right place. Olivia {4} it, and the robot said ‘Hello!’ to everyone. Olivia didn’t win, but she got a {5} for the funniest machine.'
  ],
  answers: ['science', 'made', 'nervous', 'robot', 'fixed', 'prize'],
  box: ['science', 'made', 'nervous', 'robot', 'fixed', 'prize', 'tidy', 'lost', 'ticket', 'quickly'],
  titles: ['Olivia’s talking robot', 'The broken bottle', 'A day at the science museum'],
  titleAnswer: 0
});

RW4.push({
  title: 'Chocolate',
  text: [
    'People have eaten chocolate {0} thousands of years. It is made {1} the beans of the cacao tree, {2} grows in hot countries. A long time ago, people in Central America made a drink {3} these beans. They did not put sugar in it, so it was not sweet {4} all!',
    'When chocolate arrived in Europe, people started to add sugar and milk {5} it. Today, chocolate is one of the {6} popular sweets in the world. Some people eat it every day, but doctors say we {7} not eat too much of it.',
    'Did you know that chocolate is {8} for dogs? So never give {9} chocolate to your pet! {10} you like dark chocolate or milk chocolate?'
  ],
  gaps: [
    ['for', 'since', 'ago'],
    ['from', 'with', 'at'],
    ['which', 'who', 'where'],
    ['from', 'at', 'under'],
    ['at', 'in', 'on'],
    ['to', 'at', 'by'],
    ['most', 'more', 'much'],
    ['should', 'can', 'did'],
    ['dangerous', 'danger', 'dangerously'],
    ['any', 'some', 'every'],
    ['Do', 'Are', 'Is']
  ]
});

RW5.push({
  title: 'Grandpa’s garden',
  story: [
    'Every Saturday, Mia helps her grandpa in his garden. He grows carrots, potatoes and strawberries, and he has got three hens which give him fresh eggs every morning.',
    'Last Saturday, when Mia arrived, Grandpa looked worried. ‘Somebody has eaten all my strawberries!’ he said. Mia looked around the garden and found some small footprints in the mud. ‘I think it was an animal,’ she said.',
    'That night, Mia stayed at Grandpa’s house. At midnight, they heard a noise outside. They took a torch and went into the garden very quietly. There, next to the strawberry plants, was a young fox! When it saw the light, it ran away under the fence. The next day, Grandpa built a higher fence, and Mia painted a sign which said ‘NO FOXES!’ Grandpa laughed. ‘I don’t think foxes can read, Mia!’'
  ],
  example: { s: 'Mia helps her grandpa every ___ .', a: 'Saturday' },
  items: [
    { s: 'Grandpa gets fresh eggs from his ___ .', a: ['three hens', 'hens'] },
    { s: 'Somebody ate all of Grandpa’s ___ .', a: ['strawberries'] },
    { s: 'Mia found ___ in the mud.', a: ['small footprints', 'some small footprints', 'footprints', 'some footprints'] },
    { s: 'Mia and Grandpa heard a noise at ___ .', a: ['midnight'] },
    { s: 'They took ___ into the garden.', a: ['a torch', 'torch'] },
    { s: 'The fox ran away under ___ .', a: ['the fence', 'fence'] },
    { s: 'Mia painted ___ for the garden.', a: ['a sign', 'sign'] }
  ]
});

RW6.push({
  title: 'An email to Grandma',
  text: [
    'Hi Grandma,',
    'Thank you {0} the lovely birthday present! I have {1} read two of the books, and they are really exciting.',
    'Last weekend, Dad and I went to the zoo. We saw some monkeys {2} were playing in the trees. My favourite animal was the giraffe because it was {3} tall!',
    'Are you coming to visit us {4} summer? I want to show you my new bedroom. Please write {5} me soon!',
    'Lots of love, Sam'
  ],
  example: 'for',
  answers: [['already', 'just'], ['which', 'that', 'who'], ['so', 'very', 'really'], ['this', 'next', 'in'], ['to']]
});

L1.push({
  title: 'At the swimming pool',
  instr: 'Listen and draw lines. (Poslouchej a přiřaď jména k lidem na obrázku.)',
  cards: [
    { id: 'A', emoji: '👦🏊' }, { id: 'B', emoji: '👧🤿' }, { id: 'C', emoji: '👨🧢' }, { id: 'D', emoji: '👩📖' },
    { id: 'E', emoji: '👧🍉' }, { id: 'F', emoji: '👦🏐' }, { id: 'G', emoji: '👴☂️' }, { id: 'H', emoji: '👩🕶️' }
  ],
  names: ['Peter', 'Mary', 'Jim', 'Katy', 'Richard', 'Sally', 'Fred'],
  example: { name: 'Peter', card: 'F' },
  answers: { Mary: 'B', Jim: 'A', Katy: 'E', Richard: 'G', Sally: 'H' },
  script: [
    { who: 'girl', text: 'There are lots of people at the swimming pool today!' },
    { who: 'man', text: 'Yes. Look at the boy with the ball. That’s Peter. He’s playing volleyball with his friends.' },
    { who: 'narrator', text: 'Can you see the line? This is an example. Now you listen and draw lines.' },
    { who: 'girl', text: 'Who’s the girl with the mask?' },
    { who: 'man', text: 'That’s Mary. She’s looking for something at the bottom of the pool. She’s a very good diver.' },
    { who: 'girl', text: 'And the boy who’s swimming? Is that Fred?' },
    { who: 'man', text: 'No, Fred isn’t here today. That’s Jim. He’s swimming very fast.' },
    { who: 'girl', text: 'Look at the girl who’s eating a watermelon!' },
    { who: 'man', text: 'That’s Katy. She loves fruit.' },
    { who: 'girl', text: 'Who’s the old man under the umbrella?' },
    { who: 'man', text: 'That’s Richard. He’s Katy’s grandfather. He doesn’t like the sun.' },
    { who: 'girl', text: 'Is the woman who’s reading a book Sally?' },
    { who: 'man', text: 'No, that’s my teacher. Sally is the woman with the sunglasses. She’s wearing them because it’s very sunny.' }
  ]
});

L2.push({
  title: 'The library card',
  instr: 'Listen and write. There is one example. (Poslouchej a doplň slovo nebo číslo.)',
  formTitle: 'CITY LIBRARY – NEW CARD',
  example: { label: 'First name', a: 'Lucy' },
  fields: [
    { label: 'Surname', a: ['Parker'] },
    { label: 'House number', a: ['42', 'forty-two', 'forty two'] },
    { label: 'Street', a: ['Lake Road', 'Lake'] },
    { label: 'Likes books about', a: ['animals'] },
    { label: 'Collect card on', a: ['Thursday'] }
  ],
  script: [
    { who: 'man', text: 'Hello. Would you like a library card?' },
    { who: 'girl', text: 'Yes, please.' },
    { who: 'man', text: 'What’s your first name?' },
    { who: 'girl', text: 'Lucy.' },
    { who: 'narrator', text: 'Can you see the answer? Now you listen and write.' },
    { who: 'man', text: 'And your surname, Lucy?' },
    { who: 'girl', text: 'Parker. P. A. R. K. E. R.' },
    { who: 'man', text: 'Thank you. What’s your house number?' },
    { who: 'girl', text: 'It’s twenty-four. Oh, sorry, no! It’s forty-two.' },
    { who: 'man', text: 'Forty-two. And what’s the name of your street?' },
    { who: 'girl', text: 'Lake Road. It’s near the park.' },
    { who: 'man', text: 'What kind of books do you like reading?' },
    { who: 'girl', text: 'I sometimes read stories about pirates, but I like books about animals best.' },
    { who: 'man', text: 'We’ve got lots of those! Your card will be ready on Thursday. You can collect it after school.' },
    { who: 'girl', text: 'Not Wednesday?' },
    { who: 'man', text: 'No, sorry. Thursday.' }
  ]
});

L3.push({
  title: 'Summer holidays',
  instr: 'Where did each person go on holiday? Listen and write a letter. (Kam kdo jel na prázdniny? Napiš písmeno.)',
  cards: [
    { id: 'A', emoji: '🏔️' }, { id: 'B', emoji: '🏖️' }, { id: 'C', emoji: '🏰' }, { id: 'D', emoji: '🏕️' },
    { id: 'E', emoji: '🏙️' }, { id: 'F', emoji: '🏝️' }, { id: 'G', emoji: '🚢' }, { id: 'H', emoji: '🎡' }
  ],
  names: ['Aunt Sophie', 'Harry', 'Emma', 'Grandpa', 'Daisy', 'Mr Brown'],
  example: { name: 'Aunt Sophie', card: 'C' },
  answers: { Harry: 'D', Emma: 'A', Grandpa: 'G', Daisy: 'E', 'Mr Brown': 'F' },
  script: [
    { who: 'girl', text: 'Mum, where did everyone go on holiday this summer?' },
    { who: 'woman', text: 'Well, Aunt Sophie visited an old castle in Scotland.' },
    { who: 'narrator', text: 'Can you see the letter C? Now you listen and write a letter in each box.' },
    { who: 'girl', text: 'What about Harry? Did he go to the beach?' },
    { who: 'woman', text: 'No, he went camping with his scout group. They slept in tents for a week.' },
    { who: 'girl', text: 'And Emma?' },
    { who: 'woman', text: 'Emma went to the mountains. She climbed to the top of a very high one!' },
    { who: 'girl', text: 'Did Grandpa go to the funfair again?' },
    { who: 'woman', text: 'Not this year. He went on a big ship and visited lots of different countries.' },
    { who: 'girl', text: 'What about Daisy?' },
    { who: 'woman', text: 'Daisy went to London. She loved all the tall buildings and the museums.' },
    { who: 'girl', text: 'And our neighbour, Mr Brown?' },
    { who: 'woman', text: 'He went to a small island. He said it was very quiet and beautiful.' }
  ]
});

L4.push({
  title: 'Five more conversations',
  instr: 'Listen and tick the box. (Poslouchej a vyber správný obrázek.)',
  items: [
    {
      q: 'Where are Paul’s glasses?',
      options: ['🛏️', '📺', '🛁'], a: 0,
      script: [
        { who: 'boy', text: 'Mum, have you seen my glasses? They’re not next to the TV.' },
        { who: 'woman', text: 'Did you look in the bathroom?' },
        { who: 'boy', text: 'Yes, I did.' },
        { who: 'woman', text: 'Then look on your bed. I saw them there this morning.' },
        { who: 'boy', text: 'Oh yes, here they are!' }
      ]
    },
    {
      q: 'What did Anna buy at the shop?',
      options: ['🍎', '🥛', '🍞'], a: 2,
      script: [
        { who: 'man', text: 'Did you get some milk, Anna?' },
        { who: 'girl', text: 'They didn’t have any, Dad. And we’ve got lots of apples at home, so I bought some bread.' }
      ]
    },
    {
      q: 'Which sport will Ben do next term?',
      options: ['⚽', '🏀', '🎾'], a: 2,
      script: [
        { who: 'man', text: 'Are you going to play football again next term, Ben?' },
        { who: 'boy', text: 'No, I’ve done that for two years. I wanted to play basketball, but the team is full, so I’m going to learn tennis.' }
      ]
    },
    {
      q: 'What’s the matter with Grandma?',
      options: ['🤧', '🦷', '🤕'], a: 1,
      script: [
        { who: 'girl', text: 'Is Grandma OK? Has she got a cold again?' },
        { who: 'man', text: 'No, her cold is better now. But she’s got toothache, so she’s going to the dentist this afternoon.' }
      ]
    },
    {
      q: 'What will Tom buy for his sister?',
      options: ['📚', '🎒', '🧸'], a: 1,
      script: [
        { who: 'woman', text: 'What are you going to get your sister for her birthday, Tom? A book?' },
        { who: 'boy', text: 'She’s got too many books! I’ll buy her a new school bag, because her old one is broken.' }
      ]
    }
  ]
});

L5.push({
  title: 'In the classroom',
  instr: 'Listen and colour and write. (Poslouchej, vybarvi a napiš.)',
  objects: [
    { id: 'bag', emoji: '🎒' }, { id: 'chair', emoji: '🪑' }, { id: 'clock', emoji: '🕰️' }, { id: 'box', emoji: '📦' },
    { id: 'pencil', emoji: '✏️' }, { id: 'map', emoji: '🗺️' }, { id: 'plant', emoji: '🪴' }, { id: 'computer', emoji: '🖥️' }
  ],
  colours: ['red', 'blue', 'green', 'yellow', 'brown', 'purple', 'orange', 'pink', 'grey', 'black'],
  example: { type: 'colour', object: 'bag', value: 'blue' },
  tasks: [
    { type: 'colour', object: 'chair', value: 'orange' },
    { type: 'write', object: 'box', value: 'pens' },
    { type: 'colour', object: 'pencil', value: 'pink' },
    { type: 'write', object: 'map', value: 'italy' },
    { type: 'colour', object: 'clock', value: 'brown' }
  ],
  script: [
    { who: 'woman', text: 'Look at this picture of a classroom. Let’s colour it.' },
    { who: 'boy', text: 'OK. What shall I do first?' },
    { who: 'woman', text: 'Can you see the bag next to the door? Colour it blue.' },
    { who: 'narrator', text: 'Can you see the blue bag? This is an example. Now you listen and colour and write.' },
    { who: 'boy', text: 'What can I colour now?' },
    { who: 'woman', text: 'Find the chair near the window. Colour that chair orange.' },
    { who: 'boy', text: 'Orange. OK.' },
    { who: 'woman', text: 'Now, there’s a box on the teacher’s desk. Write the word PENS on it.' },
    { who: 'boy', text: 'P. E. N. S. Done.' },
    { who: 'woman', text: 'Good. Now colour the pencil. Make it pink.' },
    { who: 'boy', text: 'Pink? That’s a funny colour for a pencil!' },
    { who: 'woman', text: 'Yes, it is! Now look at the map on the wall. Write ITALY on the map.' },
    { who: 'boy', text: 'I. T. A. L. Y. My uncle lives there!' },
    { who: 'woman', text: 'And the last thing: colour the clock brown.' },
    { who: 'boy', text: 'Brown. I’ve finished!' }
  ]
});

SP1.push({
  title: 'In the park',
  instr: 'Examiner říká věty o svém obrázku. Tvůj obrázek je trochu jiný – řekni, co je jinak.',
  items: [
    { examiner: 'In my picture, the boy is riding a bike.', mine: '👦🛹 skateboard', model: 'In my picture, the boy is riding a skateboard.' },
    { examiner: 'In my picture, there are two birds in the tree.', mine: '🐦🐦🐦🐦 4 birds', model: 'In my picture, there are four birds in the tree.' },
    { examiner: 'In my picture, the sun is shining.', mine: '🌧️ raining', model: 'In my picture, it’s raining.' },
    { examiner: 'In my picture, the girl has got short hair.', mine: '👧 long hair', model: 'In my picture, the girl has got long hair.' },
    { examiner: 'In my picture, the dog is black.', mine: '🐕 white dog', model: 'In my picture, the dog is white.' },
    { examiner: 'In my picture, the man is reading a newspaper.', mine: '👨☕ drinking coffee', model: 'In my picture, the man is drinking coffee.' }
  ]
});

SP2.push({
  title: 'Birthday parties',
  instr: 'Nejdřív odpovídej na otázky o Annině oslavě (máš kartičku). Pak se ptej examinera na Tomovu oslavu.',
  otherTitle: 'Tom’s birthday party',
  myCard: { title: 'Anna’s birthday party', rows: [['Where', 'at home'], ['When', 'on Saturday'], ['Food', 'pizza'], ['How many friends', '10'], ['Best present', 'a puppy']] },
  examinerAsks: [
    { q: 'Where was Anna’s party?', a: 'It was at home.' },
    { q: 'When was it?', a: 'On Saturday.' },
    { q: 'What did they eat?', a: 'Pizza.' },
    { q: 'How many friends came to the party?', a: 'Ten.' },
    { q: 'What was her best present?', a: 'A puppy.' }
  ],
  youAsk: [
    { prompt: 'Where?', q: 'Where was Tom’s party?', a: 'At the swimming pool.' },
    { prompt: 'When?', q: 'When was it?', a: 'On Sunday.' },
    { prompt: 'Food?', q: 'What did they eat?', a: 'Burgers and chocolate cake.' },
    { prompt: 'How many friends?', q: 'How many friends came?', a: 'Twelve.' },
    { prompt: 'Best present?', q: 'What was his best present?', a: 'A new skateboard.' }
  ]
});

SP3.push({
  title: 'The snowman',
  instr: 'Examiner řekne první obrázek. Ty pokračuj v příběhu – ke každému obrázku 1–2 věty.',
  panels: [
    { emoji: '👧👦❄️⛄', text: 'It’s snowing. Sam and his sister are making a snowman in the garden.' },
    { emoji: '⛄🧣🥕', text: 'They put a scarf and a carrot on the snowman. It looks great!' },
    { emoji: '☀️⛄😢', text: 'The next day, the sun is shining and the snowman is melting. The children are sad.' },
    { emoji: '👩📸⛄', text: 'Mum says, “Don’t worry! I took a photo of your snowman yesterday.”' },
    { emoji: '🖼️👧👦😊', text: 'They put the photo on the wall and they are happy again.' }
  ]
});

SP4.push(
  { q: 'What’s your favourite food?', model: 'My favourite food is spaghetti. My dad cooks it every Sunday.' },
  { q: 'Tell me about your bedroom.', model: 'My bedroom is small but nice. There’s a bed, a desk and a big shelf with books.' },
  { q: 'What do you do after school?', model: 'After school I do my homework, and then I play with my friends outside.' },
  { q: 'What sport do you like? Why?', model: 'I like swimming because it’s fun and I feel strong after it.' },
  { q: 'What did you do on your last birthday?', model: 'On my last birthday I went bowling with my friends and we ate a big cake.' }
);
