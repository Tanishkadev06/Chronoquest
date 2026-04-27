import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'ashoka-kalinga',
    title: 'Ashoka and the Kalinga War',
    category: 'Indian History',
    era: '261 BCE',
    description: 'Witness the bloodiest war of ancient India and the transformation of Emperor Ashoka.',
    xpReward: 150,
    requiredLevel: 1,
    imageUrl: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    whatIf: {
      realHistory: 'Ashoka embraced Buddhism after the Kalinga War, spreading peace and dharma across Asia. His edicts promoted religious tolerance, public hospitals, and animal welfare.',
      yourTimeline: 'Without Ashoka\'s transformation, the Maurya Empire continues military expansion. Buddhism never receives imperial patronage and remains a minor sect. India\'s cultural identity shifts toward unbroken militarism.',
      impact: { stability: 35, growth: 55, humanImpact: 20 },
      effects: {
        immediate: 'Kalinga is brutally subjugated. Resistance simmers. The empire grows richer but more hated.',
        midTerm: 'Without Buddhist diplomacy, Maurya borders keep expanding through force. Neighboring kingdoms form defensive alliances against India.',
        longTerm: 'Buddhism fades in India without Ashoka\'s missionaries. The cultural bridge to Southeast Asia and East Asia never forms. World history takes a profoundly different spiritual path.',
      },
    },
    steps: [
      {
        id: 's1',
        text: 'You are Ashoka, ruler of the mighty Maurya Empire. The year is 261 BCE. Your advisors report that Kalinga — the last independent kingdom in India — refuses to submit to your empire.',
      },
      {
        id: 's2',
        text: 'You study the maps. Kalinga is wealthy and proud, with a fierce army of warriors. Your own forces are vast — hundreds of thousands of soldiers, elephants, and cavalry.',
        choices: [
          {
            id: 'c1',
            text: 'Launch a full-scale military invasion of Kalinga immediately.',
            outcome: 'Your armies march at dawn. The campaign is brutal — 100,000 Kalingans are slain in battle. 150,000 more are deported. The rivers run red.',
            xpGain: 20,
          },
          {
            id: 'c2',
            text: 'Attempt diplomatic negotiations first.',
            outcome: 'Kalinga\'s king refuses all terms. War becomes inevitable, but you prepared your people psychologically. The invasion eventually begins.',
            xpGain: 30,
          },
        ],
      },
      {
        id: 's3',
        text: 'The war is over. Kalinga has fallen. But as you walk the blood-soaked battlefield, something breaks inside you. Corpses stretch as far as the eye can see. A wounded Kalinga soldier looks up at you and asks: "Was it worth it, king?"',
        choices: [
          {
            id: 'c3',
            text: 'Order your guards to finish him off and move on.',
            outcome: 'You suppress the feeling. But in your chambers that night, the soldier\'s eyes haunt you. Sleep does not come.',
            xpGain: 10,
          },
          {
            id: 'c4',
            text: 'Kneel beside him and order your physicians to treat him.',
            outcome: 'In that moment, everything changes. You see the human cost of empire. A seed of transformation is planted in your heart.',
            xpGain: 40,
          },
        ],
      },
      {
        id: 's4',
        text: 'Weeks later, you encounter Buddhist monk Upagupta, who speaks of the Dharma — the path of compassion, non-violence, and righteousness. The teachings of the Buddha pierce through your grief and guilt like a shaft of light.',
      },
      {
        id: 's5',
        text: 'Ashoka renounces war and embraces Buddhism. He engraves his edicts on rocks and pillars across the empire — declaring religious tolerance, animal welfare, and public hospitals. The lion capital of his pillar becomes the symbol of modern India.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'In what year did the Kalinga War take place?',
        options: ['200 BCE', '261 BCE', '321 BCE', '185 BCE'],
        correctIndex: 1,
        explanation: 'The Kalinga War was fought in 261 BCE during the reign of Emperor Ashoka of the Maurya dynasty.',
      },
      {
        id: 'q2',
        question: 'Approximately how many people were killed or displaced in the Kalinga War?',
        options: ['10,000 killed, 20,000 deported', '50,000 killed, 100,000 deported', '100,000 killed, 150,000 deported', '200,000 killed, 300,000 deported'],
        correctIndex: 2,
        explanation: 'According to Ashoka\'s own edicts, approximately 100,000 were slain, 150,000 deported, and many more died from disease and famine.',
      },
      {
        id: 'q3',
        question: 'Which religion did Ashoka embrace after the Kalinga War?',
        options: ['Hinduism', 'Jainism', 'Buddhism', 'Zoroastrianism'],
        correctIndex: 2,
        explanation: 'Horrified by the destruction of the Kalinga War, Ashoka embraced Buddhism and became one of its greatest patrons.',
      },
      {
        id: 'q4',
        question: 'What symbol from Ashoka\'s reign appears on the modern Indian national flag?',
        options: ['The Lotus', 'The Dharma Chakra (Wheel)', 'The Lion', 'The Elephant'],
        correctIndex: 1,
        explanation: 'The Ashoka Chakra (Dharma Wheel) from Ashoka\'s Sarnath Lion Capital pillar appears on the Indian national flag.',
      },
      {
        id: 'q5',
        question: 'What was the primary significance of Kalinga\'s location?',
        options: ['It was the capital of rival kingdoms', 'It controlled eastern trade routes and sea ports', 'It had vast gold mines', 'It was the birthplace of Buddhism'],
        correctIndex: 1,
        explanation: 'Kalinga controlled crucial eastern trade routes and sea ports, making it strategically vital for the Maurya Empire.',
      },
    ],
  },
  {
    id: 'ww1-start',
    title: 'The War to End All Wars',
    category: 'Modern',
    era: '1914 CE',
    description: 'Experience the chain of events that ignited World War I and changed civilization forever.',
    xpReward: 150,
    requiredLevel: 1,
    imageUrl: 'https://images.pexels.com/photos/1365891/pexels-photo-1365891.jpeg?auto=compress&cs=tinysrgb&w=800',
    whatIf: {
      realHistory: 'The assassination of Franz Ferdinand triggered a cascade of alliances, plunging Europe into four years of devastating trench warfare that killed 20 million people.',
      yourTimeline: 'If diplomacy had prevailed in July 1914, the alliance system might have been reformed rather than activated. Austria-Hungary could have negotiated with Serbia under international mediation.',
      impact: { stability: 70, growth: 45, humanImpact: 85 },
      effects: {
        immediate: 'A diplomatic conference in London resolves the Sarajevo crisis. Serbia accepts most Austrian demands under international supervision.',
        midTerm: 'Without the devastating war, European empires persist longer. The Russian Revolution may still occur but takes a different form. Colonialism continues unchallenged.',
        longTerm: 'The 20th century unfolds without two world wars. Technology develops differently — no atomic bomb from WWII. But colonial empires and monarchies persist far longer, delaying independence movements worldwide.',
      },
    },
    steps: [
      {
        id: 's1',
        text: 'Sarajevo, June 28, 1914. You are a young diplomat in the Austro-Hungarian Empire. The streets are buzzing — Archduke Franz Ferdinand, heir to the throne, is visiting Bosnia.',
      },
      {
        id: 's2',
        text: 'As the Archduke\'s open-top car takes a wrong turn, it stops directly in front of Gavrilo Princip, a young Serbian nationalist. Two shots ring out. Franz Ferdinand and his wife Sophie are mortally wounded.',
        choices: [
          {
            id: 'c1',
            text: 'Shout a warning to the Archduke\'s guards.',
            outcome: 'In the chaos, your warning is lost in the crowd noise. Two shots ring out. History cannot be stopped.',
            xpGain: 20,
          },
          {
            id: 'c2',
            text: 'Rush toward Princip to stop him.',
            outcome: 'You are too far. Before you can reach him, two shots crack through the summer air. The die is cast.',
            xpGain: 20,
          },
        ],
      },
      {
        id: 's3',
        text: 'The assassination rocks Europe. Austria-Hungary, backed by Germany, issues a harsh ultimatum to Serbia. The web of alliances begins to pull nations toward the abyss.',
        choices: [
          {
            id: 'c3',
            text: 'Advocate for diplomatic mediation through Britain.',
            outcome: 'Your plea for diplomacy is noted but ignored. Germany has already sent the "blank check." The machinery of war is already turning.',
            xpGain: 30,
          },
          {
            id: 'c4',
            text: 'Support the military response to show strength.',
            outcome: 'War is declared against Serbia. Russia mobilizes. Germany declares war on Russia, then France. The invasion of neutral Belgium brings Britain in.',
            xpGain: 15,
          },
        ],
      },
      {
        id: 's4',
        text: 'Within six weeks, most of Europe is at war. Trenches stretch across France. Poison gas clouds drift over No Man\'s Land. A generation of young men marches toward machine guns.',
      },
      {
        id: 's5',
        text: 'World War I would last four years, claiming 20 million lives. It toppled four empires and redrew the map of the world. The "war to end all wars" ended nothing.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Who was assassinated in Sarajevo on June 28, 1914?',
        options: ['Kaiser Wilhelm II', 'Archduke Franz Ferdinand', 'Tsar Nicholas II', 'King Edward VII'],
        correctIndex: 1,
        explanation: 'Archduke Franz Ferdinand of Austria-Hungary was assassinated by Gavrilo Princip in Sarajevo, triggering WWI.',
      },
      {
        id: 'q2',
        question: 'Which organization orchestrated the assassination plot?',
        options: ['The Red Hand', 'The Black Hand', 'Young Bosnia', 'The Serbian Army'],
        correctIndex: 1,
        explanation: 'The Black Hand was a secret Serbian nationalist society that planned the assassination of Franz Ferdinand.',
      },
      {
        id: 'q3',
        question: 'What was the "Blank Check" in WWI history?',
        options: ['France\'s offer of financial aid to Britain', 'Germany\'s unconditional support to Austria-Hungary', 'Russia\'s promise to Serbia', 'Britain\'s war budget'],
        correctIndex: 1,
        explanation: 'The "Blank Check" refers to Germany\'s unconditional support to Austria-Hungary to take action against Serbia.',
      },
      {
        id: 'q4',
        question: 'Which event directly brought Britain into World War I?',
        options: ['The assassination of Franz Ferdinand', 'The invasion of neutral Belgium by Germany', 'Russia\'s mobilization', 'The sinking of the Lusitania'],
        correctIndex: 1,
        explanation: 'Germany\'s invasion of neutral Belgium violated international treaties and brought Britain into the war.',
      },
      {
        id: 'q5',
        question: 'Approximately how many lives were lost in World War I?',
        options: ['5 million', '10 million', '20 million', '50 million'],
        correctIndex: 2,
        explanation: 'World War I claimed approximately 20 million lives, including both military and civilian casualties.',
      },
    ],
  },
  {
    id: 'french-revolution',
    title: 'Liberty, Equality, Fraternity',
    category: 'Modern',
    era: '1789 CE',
    description: 'Stand at the gates of the Bastille as the French people rise against tyranny.',
    xpReward: 150,
    requiredLevel: 2,
    imageUrl: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=800',
    whatIf: {
      realHistory: 'The French Revolution abolished the monarchy, executed Louis XVI, and descended into the Reign of Terror before giving rise to Napoleon Bonaparte.',
      yourTimeline: 'If Louis XVI had accepted constitutional monarchy in 1789, France might have evolved peacefully toward democracy like Britain, avoiding the Terror and the Napoleonic Wars.',
      impact: { stability: 60, growth: 50, humanImpact: 65 },
      effects: {
        immediate: 'A constitutional monarchy is established. The nobility retains some privilege but shares power. The Terror never happens.',
        midTerm: 'France modernizes gradually. Without Napoleon\'s conquests, the Napoleonic Code never spreads. German and Italian unification take different paths.',
        longTerm: 'European democracy evolves more slowly but more stably. The concept of republicanism is weaker. Colonial independence movements are delayed without the revolutionary example.',
      },
    },
    steps: [
      {
        id: 's1',
        text: 'Paris, 1789. You are a bread merchant in the streets of Paris. France is bankrupt. The price of bread has tripled. People are starving.',
      },
      {
        id: 's2',
        text: 'July 14, 1789. An angry mob forms outside the Bastille fortress, a symbol of royal tyranny. The crowd demands the governor surrender the weapons stored inside.',
        choices: [
          {
            id: 'c1',
            text: 'Join the crowd storming the Bastille.',
            outcome: 'The crowd surges forward. After a brief battle, the Bastille falls. The revolution has begun.',
            xpGain: 35,
          },
          {
            id: 'c2',
            text: 'Watch from a safe distance — it\'s too dangerous.',
            outcome: 'From the safety of a rooftop, you watch the Bastille fall. History is made without you.',
            xpGain: 15,
          },
        ],
      },
      {
        id: 's3',
        text: 'The National Assembly declares the "Declaration of the Rights of Man and Citizen." The Reign of Terror begins under Robespierre — thousands are guillotined.',
        choices: [
          {
            id: 'c3',
            text: 'Support Robespierre\'s radical purge to secure the revolution.',
            outcome: 'The Committee of Public Safety rules by fear. But Robespierre himself is eventually guillotined in the Thermidorian Reaction.',
            xpGain: 20,
          },
          {
            id: 'c4',
            text: 'Speak out against the violence of the Terror.',
            outcome: 'It is dangerous to speak. But your moderate voice helps turn the tide. The Reign of Terror ends when Robespierre falls in 1794.',
            xpGain: 35,
          },
        ],
      },
      {
        id: 's4',
        text: 'From the chaos rises a young Corsican artillery officer: Napoleon Bonaparte. He promises order, glory, and the ideals of the revolution.',
      },
      {
        id: 's5',
        text: 'The French Revolution permanently reshaped the world. It abolished feudalism, spread the ideas of liberty across Europe, and laid the groundwork for modern democracy.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What date is celebrated as Bastille Day in France?',
        options: ['July 4, 1789', 'July 14, 1789', 'August 26, 1789', 'January 21, 1793'],
        correctIndex: 1,
        explanation: 'July 14, 1789, the storming of the Bastille, is celebrated as Bastille Day — the French national holiday.',
      },
      {
        id: 'q2',
        question: 'What were the Three Estates in pre-revolutionary France?',
        options: ['King, Nobles, Peasants', 'Clergy, Nobility, Commoners', 'Army, Church, State', 'Merchants, Farmers, Craftsmen'],
        correctIndex: 1,
        explanation: 'The Three Estates were the Clergy (First Estate), Nobility (Second Estate), and Commoners (Third Estate).',
      },
      {
        id: 'q3',
        question: 'What was the "Reign of Terror"?',
        options: ['The period of Napoleon\'s dictatorship', 'The period of radical revolutionary violence under Robespierre', 'The peasant uprisings before the revolution', 'Louis XVI\'s crackdown on protesters'],
        correctIndex: 1,
        explanation: 'The Reign of Terror (1793-1794) was a period of radical political repression where thousands were guillotined under Robespierre.',
      },
      {
        id: 'q4',
        question: 'How many prisoners were actually found inside the Bastille when it was stormed?',
        options: ['0', '7', '45', '200'],
        correctIndex: 1,
        explanation: 'Despite being a symbol of tyranny, only 7 prisoners were found inside the Bastille when revolutionaries stormed it.',
      },
      {
        id: 'q5',
        question: 'Who rose to power in France after the Revolution ended?',
        options: ['Louis XVII', 'Maximilien Robespierre', 'Napoleon Bonaparte', 'Jean-Paul Marat'],
        correctIndex: 2,
        explanation: 'Napoleon Bonaparte rose to power after the Revolution, eventually becoming Emperor of France in 1804.',
      },
    ],
  },
  {
    id: 'alexander-great',
    title: 'Alexander: Edge of the World',
    category: 'Ancient',
    era: '326 BCE',
    description: 'Follow Alexander the Great to the banks of the Beas river where his army refuses to go further.',
    xpReward: 120,
    requiredLevel: 2,
    imageUrl: 'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg?auto=compress&cs=tinysrgb&w=800',
    whatIf: {
      realHistory: 'Alexander\'s army mutinied at the Beas River. He turned back, and his empire fractured after his death in 323 BCE.',
      yourTimeline: 'If Alexander had pushed onward into India, he would have faced the mighty Nanda Empire with its vast war elephants. Victory was far from certain.',
      impact: { stability: 25, growth: 40, humanImpact: 30 },
      effects: {
        immediate: 'Alexander crosses the Beas. His exhausted army faces the Nanda Empire\'s 200,000 infantry and 3,000 war elephants.',
        midTerm: 'Even if victorious, supply lines stretch impossibly. Revolts erupt across the rear. The empire becomes overextended and fragile.',
        longTerm: 'A Hellenistic-Indian cultural fusion emerges in the Ganges plain. But Alexander\'s early death still shatters the empire. The Maurya Empire rises differently in a Greek-influenced eastern India.',
      },
    },
    steps: [
      {
        id: 's1',
        text: 'You are a soldier in Alexander\'s Macedonian army, 326 BCE. You have marched 11,000 miles from Greece. Now you stand at the banks of the Beas River in India.',
      },
      {
        id: 's2',
        text: 'Alexander wants to press on — to conquer all of India. But your fellow soldiers are exhausted, homesick, and terrified of the vast kingdoms ahead.',
        choices: [
          {
            id: 'c1',
            text: 'Support your general — you want to go home.',
            outcome: 'Alexander is furious. He retreats to his tent for three days. But even he cannot fight the tide of human exhaustion.',
            xpGain: 30,
          },
          {
            id: 'c2',
            text: 'Volunteer to march further — you believe in Alexander.',
            outcome: 'Alexander notices your loyalty but sees the despair in most faces. Reluctantly, he orders the eastward march to stop.',
            xpGain: 25,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'At which river did Alexander\'s army refuse to march further east?',
        options: ['Indus', 'Ganges', 'Beas (Hyphasis)', 'Jhelum'],
        correctIndex: 2,
        explanation: 'Alexander\'s army mutinied at the Beas (Hyphasis) River in 326 BCE, refusing to march further into India.',
      },
      {
        id: 'q2',
        question: 'Approximately how many miles had Alexander\'s army marched from Greece?',
        options: ['5,000 miles', '8,000 miles', '11,000 miles', '15,000 miles'],
        correctIndex: 2,
        explanation: 'By the time Alexander\'s army reached India, they had marched approximately 11,000 miles from Macedonia.',
      },
      {
        id: 'q3',
        question: 'Who spoke on behalf of Alexander\'s exhausted soldiers?',
        options: ['Ptolemy', 'Hephaestion', 'Coenus', 'Perdiccas'],
        correctIndex: 2,
        explanation: 'General Coenus gave a famous speech urging Alexander to turn back, speaking for the exhausted Macedonian soldiers.',
      },
      {
        id: 'q4',
        question: 'How many years had the soldiers been away from home when they reached India?',
        options: ['4 years', '6 years', '8 years', '12 years'],
        correctIndex: 2,
        explanation: 'By 326 BCE, Alexander\'s soldiers had been campaigning for approximately 8 years since leaving Macedonia.',
      },
      {
        id: 'q5',
        question: 'What did Alexander do when his army refused to march further?',
        options: ['Had the mutineers executed', 'Immediately agreed to turn back', 'Retreated to his tent for three days before turning back', 'Sent a smaller force onward'],
        correctIndex: 2,
        explanation: 'Alexander retired to his tent for three days in anger and grief before finally agreeing to turn the army westward.',
      },
    ],
  },
  {
    id: 'black-death',
    title: 'The Black Death',
    category: 'Medieval',
    era: '1347 CE',
    description: 'Survive the plague that killed one-third of Europe and reshaped civilization.',
    xpReward: 130,
    requiredLevel: 3,
    imageUrl: 'https://images.pexels.com/photos/3628099/pexels-photo-3628099.jpeg?auto=compress&cs=tinysrgb&w=800',
    whatIf: {
      realHistory: 'The Black Death killed one-third of Europe. The resulting labor shortage empowered surviving peasants, accelerating the end of feudalism.',
      yourTimeline: 'If quarantine had been implemented universally and early, the death toll might have been halved. But the social upheaval that ended feudalism would also be diminished.',
      impact: { stability: 50, growth: 35, humanImpact: 90 },
      effects: {
        immediate: 'Universal quarantine slows the plague dramatically. Port cities enforce 40-day isolation. Death rates drop by half in cities that comply.',
        midTerm: 'With more survivors, the labor shortage is less severe. Peasants don\'t gain the bargaining power they historically did. Feudalism persists longer.',
        longTerm: 'Europe\'s population recovers faster, but social progress is slower. The Renaissance is delayed. The age of exploration may not occur when it did, changing the entire colonial era.',
      },
    },
    steps: [
      {
        id: 's1',
        text: 'Messina, Sicily, October 1347. Twelve Genoese trading ships dock at the harbor. The sailors are dying — black boils oozing blood, fever, delirium. The Black Death has arrived in Europe.',
      },
      {
        id: 's2',
        text: 'You are a physician in Florence, 1348. The plague spreads faster than anyone imagined. One-third of the city is dead. Your theory is radical — perhaps the disease spreads through contact.',
        choices: [
          {
            id: 'c1',
            text: 'Quarantine the sick — lock infected households for 40 days.',
            outcome: 'Your quarantine measures slow the spread. Some lives are saved. You have accidentally invented quarantine.',
            xpGain: 40,
          },
          {
            id: 'c2',
            text: 'Recommend prayer and penitence — God\'s wrath must be appeased.',
            outcome: 'Masses gather in churches, spreading the disease further. The death toll mounts.',
            xpGain: 10,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What proportion of Europe\'s population died from the Black Death?',
        options: ['One-tenth', 'One-quarter', 'One-third', 'Half'],
        correctIndex: 2,
        explanation: 'The Black Death killed approximately one-third of Europe\'s population between 1347-1351.',
      },
      {
        id: 'q2',
        question: 'Where did the Black Death first arrive in Europe?',
        options: ['Venice', 'Messina, Sicily', 'Marseille', 'Genoa'],
        correctIndex: 1,
        explanation: 'The Black Death first arrived in Europe at the port of Messina, Sicily, in October 1347 via Genoese trading ships.',
      },
      {
        id: 'q3',
        question: 'What is the origin of the word "quarantine"?',
        options: ['Latin for "illness"', 'Greek for "isolation"', 'Italian for "forty days"', 'French for "clean"'],
        correctIndex: 2,
        explanation: 'Quarantine comes from the Italian "quaranta giorni" meaning forty days — the period ships were required to wait before docking.',
      },
      {
        id: 'q4',
        question: 'What bacterium caused the Black Death?',
        options: ['Streptococcus pneumoniae', 'Yersinia pestis', 'Mycobacterium tuberculosis', 'Vibrio cholerae'],
        correctIndex: 1,
        explanation: 'The Black Death was caused by the bacterium Yersinia pestis, spread primarily through fleas on rats.',
      },
      {
        id: 'q5',
        question: 'Which unintended positive consequence followed the Black Death in Europe?',
        options: ['Improved sanitation systems', 'The rise of feudalism', 'Labor shortages empowered surviving peasants', 'Increased church influence'],
        correctIndex: 2,
        explanation: 'With fewer workers, surviving peasants gained bargaining power, accelerating the decline of feudalism.',
      },
    ],
  },
  {
    id: 'mughal-empire',
    title: 'Akbar\'s Court',
    category: 'Indian History',
    era: '1556 CE',
    description: 'Navigate the golden age of the Mughal Empire under Emperor Akbar the Great.',
    xpReward: 130,
    requiredLevel: 3,
    imageUrl: 'https://images.pexels.com/photos/4846091/pexels-photo-4846091.jpeg?auto=compress&cs=tinysrgb&w=800',
    whatIf: {
      realHistory: 'Akbar\'s policy of Sulh-i-kul (universal peace) and abolition of the jizya tax created an era of unprecedented religious harmony and cultural flowering in India.',
      yourTimeline: 'If orthodox advisors had prevailed and Akbar maintained strict Islamic governance, Hindu rebellions would have fractured the empire decades earlier.',
      impact: { stability: 45, growth: 60, humanImpact: 55 },
      effects: {
        immediate: 'The jizya tax remains. Hindu Rajput alliances never form. The empire is militarily strong but culturally isolated.',
        midTerm: 'Without Rajput generals and Hindu administrators, the Mughal military is stretched thin. Regional rebellions increase. The Deccan sultanates resist more effectively.',
        longTerm: 'Mughal culture remains exclusively Persian-Islamic. The syncretic Indo-Islamic art, music, and architecture that defined the era never emerges. India\'s cultural landscape is profoundly different.',
      },
    },
    steps: [
      {
        id: 's1',
        text: 'Fatehpur Sikri, 1575. You are a scholar summoned to Emperor Akbar\'s court. Akbar is an unusual ruler — illiterate yet highly intelligent, a Muslim who seeks knowledge from all religions.',
      },
      {
        id: 's2',
        text: 'Akbar asks you to help him draft a new religious policy. His advisors are divided: orthodox Muslims want Islamic law. Hindu nobles want more autonomy.',
        choices: [
          {
            id: 'c1',
            text: 'Recommend the "Din-i-Ilahi" — a syncretic blend of all religions.',
            outcome: 'Akbar creates the Din-i-Ilahi, drawing from Islam, Hinduism, Zoroastrianism, and Christianity. It symbolizes remarkable religious tolerance.',
            xpGain: 35,
          },
          {
            id: 'c2',
            text: 'Recommend maintaining Islamic law but with Hindu representation.',
            outcome: 'Akbar appreciates the practical wisdom. He appoints Hindu Rajput nobles to high positions. The empire prospers through integration.',
            xpGain: 30,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What was the name of Akbar\'s policy of religious tolerance?',
        options: ['Sulh-i-kul', 'Din-i-Ilahi', 'Dharma', 'Millet System'],
        correctIndex: 1,
        explanation: 'Akbar founded Din-i-Ilahi (Divine Faith), a syncretic religion blending elements of Islam, Hinduism, Zoroastrianism, and Christianity.',
      },
      {
        id: 'q2',
        question: 'What was the Ibadat Khana?',
        options: ['Akbar\'s treasury', 'A house of worship debates', 'A military training ground', 'Akbar\'s personal library'],
        correctIndex: 1,
        explanation: 'Ibadat Khana (House of Worship) was a building in Fatehpur Sikri where Akbar hosted weekly interfaith debates.',
      },
      {
        id: 'q3',
        question: 'What is remarkable about Akbar despite his intellectual achievements?',
        options: ['He never left India', 'He was illiterate', 'He had no children', 'He refused to speak Persian'],
        correctIndex: 1,
        explanation: 'Despite presiding over one of the greatest cultural periods in Indian history, Akbar was reportedly illiterate.',
      },
      {
        id: 'q4',
        question: 'Where was Akbar\'s famous capital city built?',
        options: ['Delhi', 'Agra', 'Fatehpur Sikri', 'Lahore'],
        correctIndex: 2,
        explanation: 'Akbar built Fatehpur Sikri as his new capital city, though it was eventually abandoned due to water shortages.',
      },
      {
        id: 'q5',
        question: 'What tax did Akbar abolish for non-Muslims?',
        options: ['Zakat', 'Jizya', 'Kharaj', 'Ushr'],
        correctIndex: 1,
        explanation: 'Akbar abolished the jizya tax on non-Muslims, a significant act of religious tolerance.',
      },
    ],
  },
];

export const dailyChallenge = {
  id: 'daily-1',
  title: "Today's History Challenge",
  description: 'Test your knowledge for bonus XP!',
  xpBonus: 75,
  timeLimit: 30,
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  question: {
    id: 'dq1',
    question: 'Which ancient wonder of the world was destroyed by an earthquake around 226 BCE?',
    options: ['The Lighthouse of Alexandria', 'The Colossus of Rhodes', 'The Temple of Artemis', 'The Hanging Gardens of Babylon'],
    correctIndex: 1,
    explanation: 'The Colossus of Rhodes, a giant statue of the sun god Helios, was destroyed by an earthquake around 226 BCE after standing for only 54 years.',
  },
};

export const mockLeaderboard = [
  { rank: 1, name: 'HistoryBuff_99', avatar: 'HB', xp: 8420, level: 28, streak: 47 },
  { rank: 2, name: 'ChronoWizard', avatar: 'CW', xp: 7890, level: 26, streak: 32 },
  { rank: 3, name: 'TimeKeeper', avatar: 'TK', xp: 7250, level: 24, streak: 21 },
  { rank: 4, name: 'AncientScholar', avatar: 'AS', xp: 6980, level: 23, streak: 18 },
  { rank: 5, name: 'PastMaster', avatar: 'PM', xp: 6540, level: 21, streak: 35 },
  { rank: 6, name: 'EraExplorer', avatar: 'EE', xp: 5920, level: 19, streak: 14 },
  { rank: 7, name: 'LegendSeeker', avatar: 'LS', xp: 5400, level: 18, streak: 9 },
  { rank: 8, name: 'CenturyHunter', avatar: 'CH', xp: 4870, level: 16, streak: 22 },
];
