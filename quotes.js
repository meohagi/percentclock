const quotes = [
    // Existing quotes with translations
    {
        quote_en: "All we have to decide is what to do with the time that is given us.",
        quote_ko: "우리에게 주어진 시간으로 무엇을 할 것인지 결정하는 것만이 우리가 할 일이다.",
        author: "J.R.R. Tolkien"
    },
    {
        quote_en: "Time you enjoy wasting is not wasted time.",
        quote_ko: "즐겁게 낭비한 시간은 낭비한 시간이 아니다.",
        author: "Marthe Troly-Curtin"
    },
    {
        quote_en: "Don’t waste your time in anger, regrets, worries, and grudges. Life is too short to be unhappy.",
        quote_ko: "분노, 후회, 걱정, 원망으로 시간을 낭비하지 마라. 불행하기에는 인생이 너무 짧다.",
        author: "Roy T. Bennett"
    },
    {
        quote_en: "Time flies like an arrow; fruit flies like a banana.",
        quote_ko: "시간은 화살처럼 날아간다. 초파리는 바나나를 좋아한다.",
        author: "Anthony G. Oettinger"
    },
    {
        quote_en: "It is the time you have wasted for your rose that makes your rose so important.",
        quote_ko: "네 장미를 그토록 중요하게 만든 것은 네가 장미를 위해 낭비한 시간이다.",
        author: "Antoine de Saint-Exupéry"
    },
    {
        quote_en: "How did it get so late so soon?",
        quote_ko: "어떻게 이렇게 빨리 늦어버렸을까?",
        author: "Dr. Seuss"
    },
    {
        quote_en: "Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.",
        quote_ko: "어제는 지나갔다. 내일은 아직 오지 않았다. 우리에게는 오늘밖에 없다. 시작하자.",
        author: "Mother Theresa"
    },
    {
        quote_en: "You can have it all. Just not all at once.",
        quote_ko: "모든 것을 가질 수 있다. 단, 한 번에 모든 것을 가질 수는 없다.",
        author: "Oprah Winfrey"
    },
    {
        quote_en: "Don't spend time beating on a wall, hoping to transform it into a door.",
        quote_ko: "벽을 문으로 바꾸려는 희망을 품고 벽을 두드리는 데 시간을 보내지 마라.",
        author: "Coco Chanel"
    },
    {
        quote_en: "Time is the longest distance between two places.",
        quote_ko: "시간은 두 장소 사이의 가장 먼 거리이다.",
        author: "Tennessee Williams"
    },
    {
        quote_en: "They always say time changes things, but you actually have to change them yourself.",
        quote_ko: "사람들은 항상 시간이 모든 것을 변화시킨다고 말하지만, 실제로는 스스로 변화시켜야 한다.",
        author: "Andy Warhol"
    },
    {
        quote_en: "A man who dares to waste one hour of time has not discovered the value of life.",
        quote_ko: "한 시간이라도 감히 낭비하는 사람은 삶의 가치를 발견하지 못한 사람이다.",
        author: "Charles Darwin"
    },
    {
        quote_en: "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to.'",
        quote_ko: "시간은 만들어지는 것이다. '시간이 없다'고 말하는 것은 '하기 싫다'고 말하는 것과 같다.",
        author: "Lao Tzu"
    },
    {
        quote_en: "Time is an illusion.",
        quote_ko: "시간은 환상이다.",
        author: "Albert Einstein"
    },
    {
        quote_en: "The past is never dead. It's not even past.",
        quote_ko: "과거는 결코 죽지 않는다. 심지어 과거가 되지도 않는다.",
        author: "William Faulkner"
    },
    // Newly added quotes
    {
        quote_en: "We must use time as a tool, not as a couch.",
        quote_ko: "우리는 시간을 소파가 아닌 도구로 사용해야 한다.",
        author: "John F. Kennedy"
    },
    {
        quote_en: "Time is what we want most but what we use worst.",
        quote_ko: "시간은 우리가 가장 원하면서도 가장 잘못 사용하는 것이다.",
        author: "William Penn"
    },
    {
        quote_en: "Better three hours too soon than a minute too late.",
        quote_ko: "1분 늦는 것보다 3시간 이른 것이 낫다.",
        author: "William Shakespeare"
    },
    {
        quote_en: "The time for action is now. It’s never too late to do something.",
        quote_ko: "행동할 시간은 바로 지금이다. 무언가를 하기에 너무 늦은 때란 없다.",
        author: "Antoine de Saint-Exupéry"
    },
    {
        quote_en: "Lost time is never found again.",
        quote_ko: "잃어버린 시간은 다시 찾을 수 없다.",
        author: "Benjamin Franklin"
    },
    {
        quote_en: "Time is money.",
        quote_ko: "시간은 돈이다.",
        author: "Benjamin Franklin"
    },
    {
        quote_en: "The two most powerful warriors are patience and time.",
        quote_ko: "가장 강력한 두 전사는 인내와 시간이다.",
        author: "Leo Tolstoy"
    },
    {
        quote_en: "Your time is limited, so don’t waste it living someone else’s life.",
        quote_ko: "당신의 시간은 유한하니, 다른 사람의 삶을 사느라 낭비하지 마라.",
        author: "Steve Jobs"
    },
    {
        quote_en: "You may delay, but time will not.",
        quote_ko: "당신은 지체할 수 있지만, 시간은 그렇지 않다.",
        author: "Benjamin Franklin"
    },
    {
        quote_en: "If you spend too much time thinking about a thing, you’ll never get it done.",
        quote_ko: "어떤 일에 대해 너무 오래 생각하면, 결코 그 일을 끝내지 못할 것이다.",
        author: "Bruce Lee"
    },
    {
        quote_en: "Don’t watch the clock; do what it does. Keep going.",
        quote_ko: "시계를 보지 말고, 시계가 하는 대로 하라. 계속 나아가라.",
        author: "Sam Levenson"
    },
    {
        quote_en: "It’s not enough to be busy, so are the ants. The question is, what are we busy about?",
        quote_ko: "바쁘다는 것만으로는 충분하지 않다. 개미들도 그러하다. 문제는 우리가 무엇 때문에 바쁜가이다.",
        author: "Henry David Thoreau"
    },
    {
        quote_en: "Time is the wisest counselor of all.",
        quote_ko: "시간은 모든 상담가 중에서 가장 현명하다.",
        author: "Pericles"
    },
    {
        quote_en: "The key is in not spending time, but in investing it.",
        quote_ko: "핵심은 시간을 쓰는 것이 아니라, 투자하는 것이다.",
        author: "Stephen R. Covey"
    },
    {
        quote_en: "Time is the school in which we learn, time is the fire in which we burn.",
        quote_ko: "시간은 우리가 배우는 학교이고, 시간은 우리가 타오르는 불이다.",
        author: "Delmore Schwartz"
    },
    {
        quote_en: "Until you value yourself, you will not value your time. Until you value your time, you will not do anything with it.",
        quote_ko: "스스로를 소중히 여기기 전까지는 자신의 시간을 소중히 여기지 않을 것이다. 자신의 시간을 소중히 여기기 전까지는 아무것도 하지 않을 것이다.",
        author: "M. Scott Peck"
    },
    {
        quote_en: "Time is a storm in which we are all lost.",
        quote_ko: "시간은 우리 모두가 길을 잃는 폭풍이다.",
        author: "William Carlos Williams"
    },
    {
        quote_en: "The future is uncertain but the end is always near.",
        quote_ko: "미래는 불확실하지만 끝은 항상 가깝다.",
        author: "Jim Morrison"
    },
    {
        quote_en: "There is never enough time to do everything, but there is always enough time to do the most important thing.",
        quote_ko: "모든 것을 할 시간은 결코 충분하지 않지만, 가장 중요한 것을 할 시간은 항상 충분하다.",
        author: "Brian Tracy"
    },
    {
        quote_en: "The best time to plant a tree was 20 years ago. The second best time is now.",
        quote_ko: "나무를 심기에 가장 좋은 때는 20년 전이었다. 두 번째로 좋은 때는 바로 지금이다.",
        author: "Chinese Proverb"
    },
    {
        quote_en: "Time takes it all, whether you want it to or not.",
        quote_ko: "원하든 원하지 않든, 시간은 모든 것을 앗아간다.",
        author: "Stephen King"
    },
    {
        quote_en: "Time is the one thing that can never be retrieved.",
        quote_ko: "시간은 결코 되돌릴 수 없는 유일한 것이다.",
        author: "C.R. Lawton"
    },
    {
        quote_en: "Regret for wasted time is more wasted time.",
        quote_ko: "낭비한 시간에 대한 후회는 더 큰 시간 낭비이다.",
        author: "Mason Cooley"
    },
    {
        quote_en: "Ordinary people think merely of spending time. Great people think of using it.",
        quote_ko: "평범한 사람은 단지 시간을 보내는 것을 생각한다. 위대한 사람은 시간을 사용하는 것을 생각한다.",
        author: "Anonymous"
    },
    {
        quote_en: "The future starts today, not tomorrow.",
        quote_ko: "미래는 내일이 아니라 오늘 시작된다.",
        author: "Pope John Paul II"
    },
    {
        quote_en: "The best thing about the future is that it comes one day at a time.",
        quote_ko: "미래의 가장 좋은 점은 하루에 하나씩 온다는 것이다.",
        author: "Abraham Lincoln"
    },
    {
        quote_en: "Time is the most valuable thing that a man can spend.",
        quote_ko: "시간은 인간이 쓸 수 있는 가장 귀중한 것이다.",
        author: "Theophrastus"
    },
    {
        quote_en: "Punctuality is the thief of time.",
        quote_ko: "시간 엄수는 시간의 도둑이다.",
        author: "Oscar Wilde"
    },
    {
        quote_en: "Time is a great teacher, but unfortunately, it kills all its pupils.",
        quote_ko: "시간은 위대한 스승이지만, 불행히도 모든 제자를 죽인다.",
        author: "Hector Berlioz"
    },
    {
        quote_en: "An inch of time is an inch of gold but you can’t buy that inch of time with an inch of gold.",
        quote_ko: "촌음은 촌금이지만, 촌금으로 촌음을 살 수는 없다.",
        author: "Chinese Proverb"
    },
    {
        quote_en: "The bad news is time flies. The good news is you’re the pilot.",
        quote_ko: "나쁜 소식은 시간이 날아간다는 것이고, 좋은 소식은 당신이 조종사라는 것이다.",
        author: "Michael Altshuler"
    },
    {
        quote_en: "There’s only one thing more precious than our time and that’s who we spend it on.",
        quote_ko: "우리의 시간보다 더 소중한 것은 단 하나, 우리가 그 시간을 누구와 보내는가이다.",
        author: "Leo Christopher"
    },
    {
        quote_en: "Time and tide wait for no man.",
        quote_ko: "시간과 조류는 사람을 기다려주지 않는다.",
        author: "Geoffrey Chaucer"
    },
    {
        quote_en: "The present time has one advantage over every other - it is our own.",
        quote_ko: "현재는 다른 어떤 시간보다 한 가지 장점이 있다. 그것은 바로 우리 자신의 것이라는 점이다.",
        author: "Charles Caleb Colton"
    },
    {
        quote_en: "Patience is bitter, but its fruit is sweet.",
        quote_ko: "인내는 쓰지만, 그 열매는 달다.",
        author: "Aristotle"
    },
    {
        quote_en: "To achieve great things, two things are needed; a plan, and not quite enough time.",
        quote_ko: "위대한 것을 성취하기 위해서는 두 가지가 필요하다. 계획, 그리고 약간 부족한 시간.",
        author: "Leonard Bernstein"
    },
    {
        quote_en: "Time makes more converts than reason.",
        quote_ko: "이성보다 시간이 더 많은 사람을 변화시킨다.",
        author: "Thomas Paine"
    },
    {
        quote_en: "The wisest are the most annoyed at the loss of time.",
        quote_ko: "가장 현명한 사람은 시간 낭비에 가장 화를 낸다.",
        author: "Dante Alighieri"
    },
    {
        quote_en: "Time will pass and seasons will come and go.",
        quote_ko: "시간은 흐르고 계절은 오고 갈 것이다.",
        author: "Roy Bean"
    },
    {
        quote_en: "We are time’s subjects, and time bids be gone.",
        quote_ko: "우리는 시간의 신하이며, 시간은 우리에게 떠나라고 명한다.",
        author: "William Shakespeare"
    },
    {
        quote_en: "If we take care of the moments, the years will take care of themselves.",
        quote_ko: "순간들을 소중히 하면, 세월은 저절로 흘러갈 것이다.",
        author: "Maria Edgeworth"
    },
    {
        quote_en: "Time brings all things to pass.",
        quote_ko: "시간이 지나면 모든 것이 이루어진다.",
        author: "Aeschylus"
    },
    {
        quote_en: "It is looking at things for a long time that ripens you and gives you a deeper meaning.",
        quote_ko: "사물을 오랫동안 바라보는 것이 당신을 성숙시키고 더 깊은 의미를 부여한다.",
        author: "Vincent Van Gogh"
    },
    {
        quote_en: "Everything takes time. Bees have to move very fast to stay still.",
        quote_ko: "모든 것에는 시간이 걸린다. 벌들은 가만히 있기 위해 매우 빠르게 움직여야 한다.",
        author: "David Foster Wallace"
    },
    {
        quote_en: "What then is time? If no one asks me, I know what it is. If I wish to explain it to him who asks, I do not know.",
        quote_ko: "그렇다면 시간이란 무엇인가? 아무도 묻지 않으면 나는 안다. 묻는 이에게 설명하고자 하면 나는 모른다.",
        author: "Saint Augustine"
    },
    {
        quote_en: "Time is the fairest and toughest judge.",
        quote_ko: "시간은 가장 공정하고 가장 엄격한 심판관이다.",
        author: "Edgar Quinet"
    },
    {
        quote_en: "The less one has to do, the less time one finds to do it in.",
        quote_ko: "할 일이 적을수록, 그 일을 할 시간은 더 줄어든다.",
        author: "Lord Chesterfield"
    },
    {
        quote_en: "Time is a sort of river of passing events, and strong is its current; no sooner is a thing brought to sight than it is swept by and another takes its place, and this too will be swept away.",
        quote_ko: "시간은 흐르는 사건들의 강과 같아서 그 흐름이 강하다. 어떤 것이 눈에 띄자마자 휩쓸려가고 다른 것이 그 자리를 차지하며, 그것 또한 휩쓸려갈 것이다.",
        author: "Marcus Aurelius"
    },
    {
        quote_en: "Whether it’s the best of times or the worst of times, it’s the only time we’ve got.",
        quote_ko: "지금이 최고의 시간이든 최악의 시간이든, 그것은 우리가 가진 유일한 시간이다.",
        author: "Art Buchwald"
    },
    {
        quote_en: "There's time enough, but none to spare.",
        quote_ko: "시간은 충분하지만, 낭비할 시간은 없다.",
        author: "Charles W. Chesnutt"
    },
    {
        quote_en: "Time flies, but not faster than the speed of light.",
        quote_ko: "시간은 날아가지만, 빛의 속도보다 빠르지는 않다.",
        author: "Unknown"
    },
    {
        quote_en: "Time heals what reason cannot.",
        quote_ko: "시간은 이성이 치유할 수 없는 것을 치유한다.",
        author: "Seneca"
    },
    {
        quote_en: "The only reason for time is so that everything doesn’t happen at once.",
        quote_ko: "시간이 존재하는 유일한 이유는 모든 일이 한꺼번에 일어나지 않도록 하기 위함이다.",
        author: "Albert Einstein"
    },
    {
        quote_en: "To tell time is to grant it a final definition.",
        quote_ko: "시간을 말하는 것은 그것에 최종적인 정의를 부여하는 것이다.",
        author: "Unknown"
    },
    {
        quote_en: "Time is a companion that goes with us on a journey.",
        quote_ko: "시간은 우리와 함께 여정을 떠나는 동반자이다.",
        author: "Captain Jean-Luc Picard"
    },
    {
        quote_en: "The course of time is stretched out before us like an endless film.",
        quote_ko: "시간의 흐름은 끝없는 필름처럼 우리 앞에 펼쳐져 있다.",
        author: "Unknown"
    },
    {
        quote_en: "Time changes everything except something within us which is always surprised by change.",
        quote_ko: "시간은 모든 것을 변화시키지만, 변화에 항상 놀라는 우리 안의 무언가는 예외이다.",
        author: "Thomas Hardy"
    },
    {
        quote_en: "Time is not a measure of duration but of intensity.",
        quote_ko: "시간은 지속의 척도가 아니라 강도의 척도이다.",
        author: "Unknown"
    },
    {
        quote_en: "The future is always beginning now.",
        quote_ko: "미래는 항상 지금 시작된다.",
        author: "Mark Strand"
    },
    {
        quote_en: "We must not allow the clock and the calendar to blind us to the fact that each moment of life is a miracle and mystery.",
        quote_ko: "우리는 시계와 달력이 삶의 모든 순간이 기적이고 신비라는 사실을 보지 못하게 해서는 안 된다.",
        author: "H. G. Wells"
    },
    {
        quote_en: "Time is what keeps everything from happening at once.",
        quote_ko: "시간은 모든 것이 한꺼번에 일어나는 것을 막아주는 것이다.",
        author: "Ray Cummings"
    },
    {
        quote_en: "You can't make up for lost time. You can only do better in the future.",
        quote_ko: "잃어버린 시간을 만회할 수는 없다. 미래에 더 잘할 수 있을 뿐이다.",
        author: "Ashley Judd"
    },
    {
        quote_en: "Time is a drug; too much of it kills you.",
        quote_ko: "시간은 약이다. 너무 많으면 당신을 죽인다.",
        author: "Terry Pratchett"
    },
    {
        quote_en: "Men talk of killing time, while time quietly kills them.",
        quote_ko: "사람들은 시간을 죽인다고 말하지만, 시간은 조용히 그들을 죽인다.",
        author: "Dion Boucicault"
    },
    {
        quote_en: "Time is the moving image of eternity.",
        quote_ko: "시간은 영원의 움직이는 이미지이다.",
        author: "Plato"
    },
    {
        quote_en: "The more you know, the less you need to say.",
        quote_ko: "더 많이 알수록, 더 적게 말할 필요가 있다.",
        author: "Jim Rohn"
    },
    {
        quote_en: "The moment is the sole reality.",
        quote_ko: "순간만이 유일한 현실이다.",
        author: "Unknown"
    },
    {
        quote_en: "Time has a wonderful way of showing us what really matters.",
        quote_ko: "시간은 우리에게 진정으로 중요한 것이 무엇인지 보여주는 멋진 방법을 가지고 있다.",
        author: "Margaret Peters"
    },
    {
        quote_en: "Nothing is a waste of time if you use the experience wisely.",
        quote_ko: "경험을 현명하게 사용한다면, 어떤 것도 시간 낭비가 아니다.",
        author: "Auguste Rodin"
    },
    {
        quote_en: "Time is the clarity of the spirit.",
        quote_ko: "시간은 정신의 명료함이다.",
        author: "Unknown"
    },
    {
        quote_en: "The direction of the wind is not in our hands, but we can adjust our sails.",
        quote_ko: "바람의 방향은 우리 손에 달려있지 않지만, 돛은 조절할 수 있다.",
        author: "Indian Proverb"
    },
    {
        quote_en: "There are no shortcuts to any place worth going.",
        quote_ko: "가볼 만한 곳으로 가는 지름길은 없다.",
        author: "Beverly Sills"
    },
    {
        quote_en: "The strongest of all warriors are these two — Time and Patience.",
        quote_ko: "모든 전사들 중에서 가장 강한 것은 이 두 가지, 즉 시간과 인내이다.",
        author: "Leo Tolstoy"
    },
    {
        quote_en: "Time is the one thing we all have in common, but it is also the one thing that we all use differently.",
        quote_ko: "시간은 우리 모두가 공통으로 가지고 있는 것이지만, 또한 우리 모두가 다르게 사용하는 것이기도 하다.",
        author: "Catherine Pulsifer"
    },
    {
        quote_en: "The way you spend your time is a result of the way you see your time and the way you really see your life.",
        quote_ko: "시간을 보내는 방식은 시간을 보는 방식과 삶을 진정으로 보는 방식의 결과이다.",
        author: "Unknown"
    },
    {
        quote_en: "The best use of time is to invest it in something that will outlast it.",
        quote_ko: "시간을 가장 잘 사용하는 방법은 시간보다 더 오래 지속될 것에 투자하는 것이다.",
        author: "Unknown"
    },
    {
        quote_en: "The secret of your future is hidden in your daily routine.",
        quote_ko: "당신의 미래의 비밀은 당신의 일상에 숨겨져 있다.",
        author: "Mike Murdock"
    },
    {
        quote_en: "A year from now you will wish you had started today.",
        quote_ko: "1년 후 당신은 오늘 시작했기를 바랄 것이다.",
        author: "Karen Lamb"
    },
    {
        quote_en: "Time is the ultimate currency.",
        quote_ko: "시간은 궁극적인 화폐이다.",
        author: "Unknown"
    },
    {
        quote_en: "It’s not about having time, it’s about making time.",
        quote_ko: "시간이 있는 것이 중요한 게 아니라, 시간을 만드는 것이 중요하다.",
        author: "Unknown"
    },
    {
        quote_en: "Success is a function of persistence and doggedness and the willingness to work hard for twenty-two minutes to make sense of something that most people would give up on after thirty seconds.",
        quote_ko: "성공은 끈기, 집요함, 그리고 대부분의 사람들이 30초 만에 포기할 것을 이해하기 위해 22분 동안 열심히 일하려는 의지의 함수이다.",
        author: "Malcolm Gladwell"
    },
    {
        quote_en: "The problem is, you think you have time.",
        quote_ko: "문제는, 당신이 시간이 있다고 생각하는 것이다.",
        author: "Buddha"
    },
    {
        quote_en: "The time you think you're missing, misses you too.",
        quote_ko: "당신이 놓치고 있다고 생각하는 시간도 당신을 그리워한다.",
        author: "Yoko Ono"
    },
    {
        quote_en: "There are moments and moments, and when you see them, you’ve got to seize them.",
        quote_ko: "순간과 순간들이 있고, 그것들을 볼 때, 당신은 그것들을 잡아야 한다.",
        author: "Unknown"
    },
    {
        quote_en: "Most of us spend too much time on what is urgent and not enough time on what is important.",
        quote_ko: "우리 대부분은 긴급한 일에 너무 많은 시간을 쓰고 중요한 일에는 충분한 시간을 쓰지 않는다.",
        author: "Stephen R. Covey"
    },
    {
        quote_en: "Time is like a river. You cannot touch the same water twice, because the flow that has passed will never pass again.",
        quote_ko: "시간은 강과 같다. 같은 물을 두 번 만질 수 없는 것은, 지나간 흐름은 다시는 지나가지 않기 때문이다.",
        author: "Unknown"
    },
    {
        quote_en: "Do something instead of killing time. Because time is killing you.",
        quote_ko: "시간을 죽이는 대신 무언가를 하라. 왜냐하면 시간이 당신을 죽이고 있기 때문이다.",
        author: "Paulo Coelho"
    },
    {
        quote_en: "Don't be a time-waster, because time is the stuff life is made of.",
        quote_ko: "시간 낭비자가 되지 마라. 왜냐하면 시간은 삶을 이루는 재료이기 때문이다.",
        author: "Unknown"
    },
    {
        quote_en: "The value of time is the mother of all values.",
        quote_ko: "시간의 가치는 모든 가치의 어머니이다.",
        author: "Unknown"
    },
    {
        quote_en: "The speed of time is a function of your own velocity.",
        quote_ko: "시간의 속도는 당신 자신의 속도의 함수이다.",
        author: "Unknown"
    },
    {
        quote_en: "The cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run.",
        quote_ko: "어떤 것의 비용은 내가 삶이라고 부르는 것의 양이며, 그것을 위해 즉시 또는 장기적으로 교환되어야 하는 것이다.",
        author: "Henry David Thoreau"
    },
    {
        quote_en: "A man is a success if he gets up in the morning and gets to bed at night, and in between he does what he wants to do.",
        quote_ko: "아침에 일어나 밤에 잠자리에 들고, 그 사이에 자신이 하고 싶은 일을 하는 사람은 성공한 사람이다.",
        author: "Bob Dylan"
    },
    {
        quote_en: "The best time to start is now.",
        quote_ko: "시작하기 가장 좋은 때는 바로 지금이다.",
        author: "Unknown"
    },
    {
        quote_en: "Time is a precious thing. Never waste it.",
        quote_ko: "시간은 소중한 것이다. 결코 낭비하지 마라.",
        author: "Gene Wilder"
    }
];