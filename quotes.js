const quotes = [
    {
        quote_en: "All we have to decide is what to do with the time that is given us.",
        quote_ko: "우리에게 주어진 시간으로 무엇을 할 것인지 결정하는 것만이 우리가 할 일이다.",
        quote_ja: "与えられた時間で何をすべきか、それが私たちが決めなければならないすべてです。",
        quote_cn: "我们所要决定的，只是如何利用被给予的时间。",
        author: "J.R.R. Tolkien"
    },
    {
        quote_en: "Time you enjoy wasting is not wasted time.",
        quote_ko: "즐겁게 낭비한 시간은 낭비한 시간이 아니다.",
        quote_ja: "楽しんで無駄にする時間は無駄な時間ではない。",
        quote_cn: "你享受浪费的时间，不是浪费的时间。",
        author: "Marthe Troly-Curtin"
    },
    {
        quote_en: "Don’t waste your time in anger, regrets, worries, and grudges. Life is too short to be unhappy.",
        quote_ko: "분노, 후회, 걱정, 원망으로 시간을 낭비하지 마라. 불행하기에는 인생이 너무 짧다.",
        quote_ja: "怒り、後悔、心配、恨みで時間を無駄にしないでください。不幸でいるには人生は短すぎます。",
        quote_cn: "不要把时间浪费在愤怒、悔恨、忧虑和怨恨上。生命太短暂，不能不开心。",
        author: "Roy T. Bennett"
    },
    {
        quote_en: "Time flies like an arrow; fruit flies like a banana.",
        quote_ko: "시간은 화살처럼 날아간다. 초파리는 바나나를 좋아한다.",
        quote_ja: "光陰矢の如し。果物バエはバナナが好き。",
        quote_cn: "时光飞逝如箭，果蝇喜爱香蕉。",
        author: "Anthony G. Oettinger"
    },
    {
        quote_en: "It is the time you have wasted for your rose that makes your rose so important.",
        quote_ko: "네 장미를 그토록 중요하게 만든 것은 네가 장미를 위해 낭비한 시간이다.",
        quote_ja: "君がバラのために無駄にした時間が、君のバラをそれほど大切にするんだ。",
        quote_cn: "正是你为你的玫瑰付出的时间，才使得你的玫瑰如此重要。",
        author: "Antoine de Saint-Exupéry"
    },
    {
        quote_en: "How did it get so late so soon?",
        quote_ko: "어떻게 이렇게 빨리 늦어버렸을까?",
        quote_ja: "どうしてこんなに早く遅くなってしまったのだろう？",
        quote_cn: "怎么这么快就晚了？",
        author: "Dr. Seuss"
    },
    {
        quote_en: "Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.",
        quote_ko: "어제는 지나갔다. 내일은 아직 오지 않았다. 우리에게는 오늘밖에 없다. 시작하자.",
        quote_ja: "昨日は去った。明日はまだ来ていない。私たちには今日しかない。さあ、始めよう。",
        quote_cn: "昨天已逝，明天未至，我们只有今天。让我们开始吧。",
        author: "Mother Theresa"
    },
    {
        quote_en: "You can have it all. Just not all at once.",
        quote_ko: "모든 것을 가질 수 있다. 단, 한 번에 모든 것을 가질 수는 없다.",
        quote_ja: "すべてを手に入れることはできる。ただ、一度にすべてを手に入れることはできないだけだ。",
        quote_cn: "你可以拥有一切，只是不能一次性拥有。",
        author: "Oprah Winfrey"
    },
    {
        quote_en: "Don't spend time beating on a wall, hoping to transform it into a door.",
        quote_ko: "벽을 문으로 바꾸려는 희망을 품고 벽을 두드리는 데 시간을 보내지 마라.",
        quote_ja: "壁をドアに変えようと期待して、壁を叩いて時間を無駄にしないでください。",
        quote_cn: "不要把时间花在敲墙上，希望能把它变成一扇门。",
        author: "Coco Chanel"
    },
    {
        quote_en: "Time is the longest distance between two places.",
        quote_ko: "시간은 두 장소 사이의 가장 먼 거리이다.",
        quote_ja: "時間は二つの場所の間の最も長い距離です。",
        quote_cn: "时间是两地之间最长的距离。",
        author: "Tennessee Williams"
    },
    {
        quote_en: "They always say time changes things, but you actually have to change them yourself.",
        quote_ko: "사람들은 항상 시간이 모든 것을 변화시킨다고 말하지만, 실제로는 스스로 변화시켜야 한다.",
        quote_ja: "時間は物事を変えると言われますが、実際には自分で変えなければなりません。",
        quote_cn: "人们总说时间能改变事情，但实际上你必须自己去改变它们。",
        author: "Andy Warhol"
    },
    {
        quote_en: "A man who dares to waste one hour of time has not discovered the value of life.",
        quote_ko: "한 시간이라도 감히 낭비하는 사람은 삶의 가치를 발견하지 못한 사람이다.",
        quote_ja: "一時間の時間を無駄にすることを敢えてする人は、人生の価値を発見していない。",
        quote_cn: "一个敢于浪费一小时时间的人，还没有发现生命的价值。",
        author: "Charles Darwin"
    },
    {
        quote_en: "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to.'",
        quote_ko: "시간은 만들어지는 것이다. '시간이 없다'고 말하는 것은 '하기 싫다'고 말하는 것과 같다.",
        quote_ja: "時間は創られたものである。「時間がない」と言うのは、「したくない」と言うのと同じだ。",
        quote_cn: "时间是创造出来的东西。说‘我没时间’，就像说‘我不想做’。",
        author: "Lao Tzu"
    },
    {
        quote_en: "Time is an illusion.",
        quote_ko: "시간은 환상이다.",
        quote_ja: "時間は幻想だ。",
        quote_cn: "时间是一种幻觉。",
        author: "Albert Einstein"
    },
    {
        quote_en: "The past is never dead. It's not even past.",
        quote_ko: "과거는 결코 죽지 않는다. 심지어 과거가 되지도 않는다.",
        quote_ja: "過去は決して死なない。それは過去ですらない。",
        quote_cn: "过去永远不会消亡，它甚至还未过去。",
        author: "William Faulkner"
    }
];
