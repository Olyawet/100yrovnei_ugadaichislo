// Базы данных для генерации шуток
const jokeTemplates = {
    absurd: [
        "Почему {subject} {action}? Потому что {absurd_reason}!",
        "Вчера {character} {action}, а {object} {reaction}.",
        "Если {subject} встретит {object}, то {absurd_consequence}.",
        "— {question}? — {absurd_answer}!",
        "Знаете ли вы, что {subject} может {action}? Это происходит когда {absurd_reason}.",
        "Однажды {character} решил {action}, но {absurd_reason}.",
        "{subject} {action} только потому, что {absurd_reason}.",
        "Если {subject} {action}, то {absurd_reason}."
    ],
    stupid: [
        "Что сказал {subject} когда {action}? {stupid_answer}!",
        "Почему {subject} {action}? {stupid_answer}!",
        "Как {subject} {action}? {stupid_answer}!",
        "{subject} {action} потому что {stupid_answer}.",
        "Если {subject} {action}, то {stupid_answer}."
    ],
    dark: [
        "Почему {subject} {action}? {dark_reason}.",
        "Знаете ли вы, что {subject} {action} из-за {dark_reason}?",
        "Однажды {character} {action}, но {dark_reason}.",
        "{subject} {action} только потому, что {dark_reason}.",
        "Если {subject} {action}, то {dark_reason}."
    ],
    science: [
        "Согласно исследованиям, {subject} {action} из-за {scientific_reason}.",
        "Ученые выяснили, что {subject} {action} когда {scientific_reason}.",
        "В лаборатории {character} обнаружил, что {subject} {action} при {scientific_reason}.",
        "Теоретически, {subject} может {action} если {scientific_reason}.",
        "Эксперимент показал: {subject} {action} благодаря {scientific_reason}."
    ],
    everyday: [
        "Вчера {character} {action} и {everyday_result}.",
        "Почему {subject} {action}? {everyday_reason}.",
        "Обычно {subject} {action}, но сегодня {everyday_twist}.",
        "Когда {character} {action}, то {everyday_result}.",
        "В повседневной жизни {subject} {action} из-за {everyday_reason}."
    ],
    animals: [
        "Почему {animal} {action}? {animal_reason}!",
        "Знаете ли вы, что {animal} {action} когда {animal_reason}?",
        "Однажды {animal} решил {action}, но {animal_reason}.",
        "{animal} {action} только потому, что {animal_reason}.",
        "Если {animal} {action}, то {animal_reason}."
    ],
    it: [
        "Почему {tech_thing} {action}? {tech_reason}!",
        "Программист {character} {action} потому что {tech_reason}.",
        "В коде {tech_thing} {action} из-за {tech_reason}.",
        "Баг в {tech_thing} заставляет его {action} когда {tech_reason}.",
        "Алгоритм {tech_thing} {action} если {tech_reason}."
    ],
    historical: [
        "В {historical_period} {character} {action} из-за {historical_reason}.",
        "Историки утверждают, что {subject} {action} когда {historical_reason}.",
        "Древние записи говорят, что {character} {action} потому что {historical_reason}.",
        "В {historical_period} {subject} {action} только если {historical_reason}.",
        "Археологи нашли доказательства, что {subject} {action} из-за {historical_reason}."
    ],
    fantasy: [
        "В мире магии {character} {action} используя {magical_reason}.",
        "Волшебник {character} {action} потому что {magical_reason}.",
        "Магический {subject} {action} когда {magical_reason}.",
        "В фантастическом мире {subject} {action} благодаря {magical_reason}.",
        "Эльф {character} {action} из-за {magical_reason}."
    ],
    romantic: [
        "Романтик {character} {action} в надежде на {romantic_reason}.",
        "Любовь заставила {character} {action} потому что {romantic_reason}.",
        "В порыве чувств {character} {action} и {romantic_result}.",
        "Романтическая душа {character} {action} когда {romantic_reason}.",
        "Сердце {character} {action} из-за {romantic_reason}."
    ],
    meta: [
        "Эта шутка {action} потому что {meta_reason}.",
        "Юмор {action} когда {meta_reason}.",
        "Комик {character} {action} из-за {meta_reason}.",
        "Шутка {action} только если {meta_reason}.",
        "В мире юмора {subject} {action} благодаря {meta_reason}."
    ]
};

// Базы данных для заполнения шаблонов
const jokeData = {
    subjects: [
        "программист", "кот", "банан", "компьютер", "чайник", "носок", "подушка", 
        "микроволновка", "зубная щетка", "пульт", "холодильник", "тапочки",
        "алгоритм", "баг", "сервер", "база данных", "интерфейс", "функция",
        "микроволновка", "пылесос", "космический корабль", "компьютерный стол",
        "электронная книга", "умная розетка", "умная лампа", "умная робот-повар",
        "умная робот-повар", "умная розетка", "умная лампа", "умная робот-повар",
        "умная робот-повар", "умная розетка", "умная лампа", "умная робот-повар",
        "умная робот-повар", "умная розетка", "умная лампа", "умная робот-повар",
        "умная робот-повар", "умная розетка", "умная лампа", "умная робот-повар"
    ],
    actions: [
        "танцует", "поет", "программирует", "готовит", "спит", "бегает", "летает",
        "говорит", "думает", "смеется", "плачет", "работает", "отдыхает",
        "кодит", "дебажит", "тестирует", "деплоит", "оптимизирует",
        "танцует", "поет", "кодит", "летает", "танцует", "поет", "кодит",
        "летает", "танцует", "поет", "кодит", "летает", "танцует", "поет",
        "кодит", "летает", "танцует", "поет", "кодит", "летает", "танцует",
        "поет", "кодит", "летает", "танцует", "поет", "кодит", "летает"
    ],
    characters: [
        "старушка", "кот-программист", "инопланетянин-дачник", "древний грек", 
        "робот-повар", "волшебник", "ученый", "детектив", "космонавт", "пират",
        "дворник", "бухгалтер", "художник", "музыкант", "спортсмен",
        "старушка", "кот-программист", "инопланетянин-дачник", "древний грек",
        "робот-повар", "волшебник", "ученый", "детектив", "космонавт", "пират",
        "дворник", "бухгалтер", "художник", "музыкант", "спортсмен"
    ],
    animals: [
        "кот", "собака", "хомяк", "попугай", "рыбка", "черепаха", "кролик",
        "хомяк-программист", "кот-хакер", "собака-тестировщик",
        "кот", "собака", "хомяк", "попугай", "рыбка", "черепаха", "кролик",
        "хомяк-программист", "кот-хакер", "собака-тестировщик"
    ],
    objects: [
        "микроволновка", "пылесос", "космический корабль", "компьютерный стол",
        "электронная книга", "умная розетка", "умная лампа", "умная робот-повар"
    ],
    absurd_reasons: [
        "вселенная решила пошутить", "законы физики взяли выходной", 
        "математика устала", "логика ушла в отпуск", "реальность дала сбой",
        "время пошло вспять", "гравитация забыла включиться", "свет замедлился",
        "вселенная решила пошутить", "гравитация устала", "математика устала",
        "логика ушла в отпуск", "реальность дала сбой", "время пошло вспять",
        "гравитация забыла включиться", "свет замедлился"
    ],
    stupid_answers: [
        "потому что да", "так получилось", "не знаю", "просто так", "почему бы и нет",
        "а почему бы и да", "так надо", "потому что можно", "так веселее",
        "потому что да", "так получилось", "не знаю", "просто так", "почему бы и нет",
        "а почему бы и да", "так надо", "потому что можно", "так веселее"
    ],
    dark_reasons: [
        "жизнь несправедлива", "все умрут", "надежды нет", "смысла нет", 
        "все бессмысленно", "смерть неизбежна", "одиночество вечно",
        "жизнь несправедлива", "все умрут", "надежды нет", "смысла нет",
        "все бессмысленно", "смерть неизбежна", "одиночество вечно"
    ],
    scientific_reasons: [
        "квантовая запутанность", "теория относительности", "закон сохранения энергии",
        "принцип неопределенности", "теория струн", "темная материя", "черные дыры",
        "квантовая запутанность", "теория относительности", "закон сохранения энергии",
        "принцип неопределенности", "теория струн", "темная материя", "черные дыры"
    ],
    everyday_reasons: [
        "так удобнее", "привычка", "лень", "время поджимает", "забыл", "не успел",
        "потому что можно", "так быстрее", "проще так",
        "так удобнее", "привычка", "лень", "время поджимает", "забыл", "не успел",
        "потому что можно", "так быстрее", "проще так"
    ],
    animal_reasons: [
        "инстинкты", "настроение", "голод", "любопытство", "игра", "защита",
        "охотничий инстинкт", "материнский инстинкт",
        "инстинкты", "настроение", "голод", "любопытство", "игра", "защита",
        "охотничий инстинкт", "материнский инстинкт"
    ],
    tech_reasons: [
        "баг в коде", "недостаточно памяти", "конфликт версий", "неправильный API",
        "проблемы с сетью", "вирус", "перегрев", "старая версия",
        "баг в коде", "недостаточно памяти", "конфликт версий", "неправильный API",
        "проблемы с сетью", "вирус", "перегрев", "старая версия"
    ],
    historical_periods: [
        "Древнем Египте", "Средневековье", "Древней Греции", "Древнем Риме",
        "эпохе Возрождения", "Древнем Китае", "Древней Индии", "Древней Руси"
    ],
    historical_reasons: [
        "религиозные верования", "традиции предков", "суеверия", "магические ритуалы",
        "пророчества", "знамения", "воля богов", "древние знания",
        "религиозные верования", "традиции предков", "суеверия", "магические ритуалы",
        "пророчества", "знамения", "воля богов", "древние знания"
    ],
    magical_reasons: [
        "магические заклинания", "волшебные артефакты", "магическая энергия",
        "заклинания", "магические кристаллы", "волшебная палочка", "магические руны",
        "магические заклинания", "волшебные артефакты", "магическая энергия",
        "заклинания", "магические кристаллы", "волшебная палочка", "магические руны"
    ],
    romantic_reasons: [
        "любовь с первого взгляда", "романтические чувства", "сердечные порывы",
        "поэтическое вдохновение", "романтические мечты", "любовная лихорадка",
        "любовь с первого взгляда", "романтические чувства", "сердечные порывы",
        "поэтическое вдохновение", "романтические мечты", "любовная лихорадка"
    ],
    meta_reasons: [
        "это смешно", "юмор субъективен", "комедия относительна", "смех заразителен",
        "юмор лечит", "смех продлевает жизнь", "комедия - искусство",
        "это смешно", "юмор субъективен", "комедия относительна", "смех заразителен",
        "юмор лечит", "смех продлевает жизнь", "комедия - искусство"
    ]
};

// Базы данных для историй
const storyTemplates = {
    documentary: [
        "Согласно историческим документам, найденным в {location} в {year}, {character} действительно {action}. Исследователи {research_institution} подтвердили, что {scientific_explanation}. Это открытие изменило наше понимание {field_of_study}.",
        "В архивах {archive_location} сохранились записи о том, как {character} {action}. Документы датированы {year} и содержат подробные описания {detailed_description}. Ученые {research_institution} провели анализ и подтвердили подлинность.",
        "Археологические находки в {location} пролили свет на удивительное событие: {character} {action}. Раскопки {year} года выявили {archaeological_evidence}. Это открытие стало сенсацией в научном мире."
    ],
    plausible: [
        "В {year} году в {location} произошло необычное событие: {character} {action}. Местные жители рассказывают, что {local_story}. Хотя прямых доказательств нет, многие считают эту историю правдоподобной.",
        "Согласно городским легендам {location}, {character} однажды {action}. История передавалась из уст в уста, и каждый рассказчик добавлял свои детали. В {year} году эту историю записал {chronicler}.",
        "В {location} до сих пор помнят историю о том, как {character} {action}. Произошло это в {year}, и с тех пор местные жители {local_tradition}. Хотя документальных подтверждений нет, история кажется вполне возможной."
    ],
    questionable: [
        "Некоторые источники утверждают, что в {year} году {character} {action}. Однако историки сомневаются в достоверности этих сведений, так как {doubtful_reason}. Тем не менее, история стала популярной в {location}.",
        "В народных преданиях {location} сохранилась легенда о том, как {character} {action}. Произошло это якобы в {year}, но {suspicious_details} заставляют усомниться в правдивости.",
        "Странная история о том, как {character} {action}, появилась в {year} году. Рассказывают, что {unusual_details}, что звучит довольно сомнительно. Тем не менее, в {location} эту историю помнят до сих пор."
    ],
    fiction: [
        "В далекой галактике {fictional_location} жил-был {character}, который однажды {action}. Это произошло в {fictional_year}, когда {fictional_circumstances}. С тех пор эту историю рассказывают во всех уголках {fictional_universe}.",
        "В волшебном мире {fictional_location} существовал {character}, способный {action}. Легенды гласят, что в {fictional_year} {magical_events} привели к тому, что {magical_consequences}.",
        "В параллельной вселенной {fictional_location} {character} обладал уникальной способностью {action}. В {fictional_year} произошли {cosmic_events}, которые изменили ход истории в {fictional_dimension}."
    ]
};

const storyData = {
    locations: [
        "Древнем Египте", "Средневековой Европе", "Древней Греции", "Древнем Китае",
        "Древней Индии", "Древней Руси", "Древнем Риме", "Месопотамии",
        "офисе 90-х годов", "деревне Гадюкино", "космической станции 3000",
        "подземной лаборатории", "заброшенном замке", "магической академии"
    ],
    years: [
        "2023 году", "1995 году", "1987 году", "1973 году", "1965 году",
        "3000 году", "1500 году", "1200 году", "800 году", "500 году",
        "древние времена", "далеком прошлом", "будущем", "альтернативной реальности"
    ],
    research_institutions: [
        "Института странных явлений", "Академии абсурдных наук", "Лаборатории необычных исследований",
        "Центра изучения паранормального", "Университета магии и технологий",
        "Института квантовой юмористики", "Академии прикладного абсурда"
    ],
    scientific_explanations: [
        "квантовая запутанность влияет на поведение объектов", "теория относительности работает по-другому в этом месте",
        "законы физики имеют исключения", "математика не всегда точна",
        "время течет неравномерно", "пространство искривлено", "реальность нестабильна",
        "квантовая запутанность влияет на поведение объектов", "теория относительности работает по-другому в этом месте",
        "законы физики имеют исключения", "математика не всегда точна",
        "время течет неравномерно", "пространство искривлено", "реальность нестабильна"
    ],
    fields_of_study: [
        "физики", "математики", "истории", "психологии", "философии",
        "квантовой механики", "теории относительности", "космологии"
    ],
    archive_locations: [
        "Ватиканской библиотеке", "Британском музее", "Национальном архиве",
        "Древней библиотеке", "Секретных архивах", "Забытой библиотеке",
        "Архиве странных документов", "Библиотеке магии"
    ],
    detailed_descriptions: [
        "необычных событий", "странных явлений", "магических ритуалов",
        "научных экспериментов", "паранормальных активностей", "космических происшествий"
    ],
    archaeological_evidence: [
        "древние руины", "магические артефакты", "странные надписи",
        "необычные сооружения", "загадочные предметы", "мистические символы"
    ],
    local_stories: [
        "это было связано с магией", "виной были инопланетяне", "это было предсказано",
        "это изменило судьбу города", "это принесло удачу", "это было знамением",
        "это было связано с магией", "виной были инопланетяне", "это было предсказано",
        "это изменило судьбу города", "это принесло удачу", "это было знамением"
    ],
    chroniclers: [
        "местный летописец", "странствующий монах", "ученый-исследователь",
        "магический историк", "космический археолог", "временной путешественник",
        "местный летописец", "странствующий монах", "ученый-исследователь",
        "магический историк", "космический археолог", "временной путешественник"
    ],
    local_traditions: [
        "проводят ежегодные праздники", "почитают это место", "рассказывают легенды",
        "собираются на ритуалы", "празднуют годовщину", "хранят память",
        "проводят ежегодные праздники", "почитают это место", "рассказывают легенды",
        "собираются на ритуалы", "празднуют годовщину", "хранят память"
    ],
    doubtful_reasons: [
        "источники противоречивы", "нет материальных доказательств", "свидетели ненадежны",
        "время стерло детали", "история искажена", "факты смешались с вымыслом",
        "источники противоречивы", "нет материальных доказательств", "свидетели ненадежны",
        "время стерло детали", "история искажена", "факты смешались с вымыслом"
    ],
    suspicious_details: [
        "описания слишком фантастичны", "временные рамки не сходятся", "места не существуют",
        "персонажи вымышлены", "события невозможны", "логика нарушена",
        "описания слишком фантастичны", "временные рамки не сходятся", "места не существуют",
        "персонажи вымышлены", "события невозможны", "логика нарушена"
    ],
    unusual_details: [
        "произошло в полночь", "участвовали призраки", "время остановилось",
        "появились инопланетяне", "открылся портал", "изменились законы физики",
        "произошло в полночь", "участвовали призраки", "время остановилось",
        "появились инопланетяне", "открылся портал", "изменились законы физики"
    ],
    fictional_locations: [
        "галактике Андромеда", "планете Ксено", "измерении Нет", "вселенной Можетбыть",
        "космосе Возможно", "реальности Альтернативной", "мире Фантастическом"
    ],
    fictional_years: [
        "3000 году", "далеком будущем", "альтернативном времени", "параллельной эпохе",
        "космической эре", "магическом веке", "технологическом периоде"
    ],
    fictional_circumstances: [
        "звезды выстроились особым образом", "произошло космическое событие",
        "активировались древние технологии", "пробудились магические силы",
        "открылись межгалактические порталы", "изменились законы вселенной",
        "звезды выстроились особым образом", "произошло космическое событие",
        "активировались древние технологии", "пробудились магические силы",
        "открылись межгалактические порталы", "изменились законы вселенной"
    ],
    fictional_universes: [
        "известной вселенной", "параллельном мире", "альтернативной реальности",
        "космическом пространстве", "магическом измерении", "технологическом будущем",
        "известной вселенной", "параллельном мире", "альтернативной реальности",
        "космическом пространстве", "магическом измерении", "технологическом будущем"
    ],
    magical_events: [
        "соединились магические потоки", "активировались древние руны",
        "пробудились силы стихий", "открылись порталы между мирами",
        "смешались магия и технологии", "произошло магическое явление",
        "соединились магические потоки", "активировались древние руны",
        "пробудились силы стихий", "открылись порталы между мирами",
        "смешались магия и технологии", "произошло магическое явление"
    ],
    magical_consequences: [
        "изменились законы магии", "появились новые способности", "открылись новые миры",
        "смешались реальности", "пробудились древние силы", "изменилась природа вещей",
        "изменились законы магии", "появились новые способности", "открылись новые миры",
        "смешались реальности", "пробудились древние силы", "изменилась природа вещей"
    ],
    cosmic_events: [
        "столкнулись галактики", "взорвались звезды", "образовались черные дыры",
        "изменились законы физики", "произошли временные аномалии", "открылись порталы",
        "столкнулись галактики", "взорвались звезды", "образовались черные дыры",
        "изменились законы физики", "произошли временные аномалии", "открылись порталы"
    ],
    fictional_dimensions: [
        "параллельной вселенной", "альтернативной реальности", "космическом пространстве",
        "магическом измерении", "технологическом будущем", "фантастическом мире",
        "параллельной вселенной", "альтернативной реальности", "космическом пространстве",
        "магическом измерении", "технологическом будущем", "фантастическом мире"
    ]
};

// Класс для генерации шуток
class JokeGenerator {
    constructor() {
        this.currentSettings = {
            type: 'random',
            funnyLevel: 5,
            absurdLevel: 5,
            darkLevel: 5,
            complexLevel: 5,
            punsLevel: 'none',
            surpriseEnding: false,
            character: 'random',
            requiredWord: '',
            theme: '',
            deliveryStyle: 'anecdote'
        };
        
        this.historySettings = {
            realism: 'documentary',
            era: 'random',
            tone: 'tragicomic'
        };
        
        this.gallery = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateSliderIndicators();
        this.loadGallery();
    }

    setupEventListeners() {
        // Кнопки типов шуток
        document.querySelectorAll('.joke-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.joke-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentSettings.type = btn.dataset.type;
            });
        });

        // Слайдеры
        document.querySelectorAll('.slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.currentSettings[e.target.id] = parseInt(e.target.value);
                this.updateSliderIndicator(e.target);
            });
        });

        // Дополнительные настройки
        document.getElementById('puns-level').addEventListener('change', (e) => {
            this.currentSettings.punsLevel = e.target.value;
        });

        document.getElementById('surprise-ending').addEventListener('change', (e) => {
            this.currentSettings.surpriseEnding = e.target.checked;
        });

        document.getElementById('character').addEventListener('change', (e) => {
            this.currentSettings.character = e.target.value;
        });

        document.getElementById('required-word').addEventListener('input', (e) => {
            this.currentSettings.requiredWord = e.target.value;
        });

        document.getElementById('theme').addEventListener('input', (e) => {
            this.currentSettings.theme = e.target.value;
        });

        document.getElementById('delivery-style').addEventListener('change', (e) => {
            this.currentSettings.deliveryStyle = e.target.value;
        });

        // Настройки истории
        document.getElementById('realism-level').addEventListener('change', (e) => {
            this.historySettings.realism = e.target.value;
        });

        document.getElementById('era-setting').addEventListener('change', (e) => {
            this.historySettings.era = e.target.value;
        });

        document.getElementById('story-tone').addEventListener('change', (e) => {
            this.historySettings.tone = e.target.value;
        });

        // Кнопки
        document.getElementById('generate-joke-btn').addEventListener('click', () => {
            this.generateJoke();
        });

        document.getElementById('generate-history-btn').addEventListener('click', () => {
            this.generateHistory();
        });

        document.getElementById('show-history-btn').addEventListener('click', () => {
            this.showHistory();
        });

        document.getElementById('generate-again-btn').addEventListener('click', () => {
            this.generateJoke();
        });

        document.getElementById('reset-settings-btn').addEventListener('click', () => {
            this.resetSettings();
        });

        document.getElementById('save-share-btn').addEventListener('click', () => {
            this.saveShare();
        });

        // Фильтр галереи
        document.getElementById('gallery-filter').addEventListener('change', (e) => {
            this.filterGallery(e.target.value);
        });
    }

    updateSliderIndicators() {
        document.querySelectorAll('.slider').forEach(slider => {
            this.updateSliderIndicator(slider);
        });
    }

    updateSliderIndicator(slider) {
        const indicator = slider.parentElement.querySelector('.slider-indicator');
        const percentage = (slider.value / slider.max) * 100;
        indicator.style.width = percentage + '%';
    }

    generateJoke() {
        this.showLoading();
        
        setTimeout(() => {
            const joke = this.createJoke();
            this.displayJoke(joke);
            this.hideLoading();
        }, 2000);
    }

    createJoke() {
        let jokeType = this.currentSettings.type;
        if (jokeType === 'random') {
            const types = Object.keys(jokeTemplates);
            jokeType = types[Math.floor(Math.random() * types.length)];
        }

        const templates = jokeTemplates[jokeType];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        let joke = this.fillTemplate(template, jokeType);
        
        // Применяем стиль подачи
        joke = this.applyDeliveryStyle(joke);
        
        // Добавляем обязательное слово если указано
        if (this.currentSettings.requiredWord && !joke.toLowerCase().includes(this.currentSettings.requiredWord.toLowerCase())) {
            joke += ` (Кстати, это связано с "${this.currentSettings.requiredWord}")`;
        }

        return {
            text: joke,
            type: jokeType,
            settings: { ...this.currentSettings },
            timestamp: new Date().toISOString()
        };
    }

    fillTemplate(template, type) {
        let joke = template;
        
        // Заполняем основные плейсхолдеры
        joke = joke.replace('{subject}', this.getRandomItem(jokeData.subjects));
        joke = joke.replace('{action}', this.getRandomItem(jokeData.actions));
        joke = joke.replace('{character}', this.getCharacter());
        
        // Заполняем специфичные плейсхолдеры
        const typeSpecificData = {
            absurd: jokeData.absurd_reasons,
            stupid: jokeData.stupid_answers,
            dark: jokeData.dark_reasons,
            science: jokeData.scientific_reasons,
            everyday: jokeData.everyday_reasons,
            animals: jokeData.animal_reasons,
            it: jokeData.tech_reasons,
            historical: jokeData.historical_reasons,
            fantasy: jokeData.magical_reasons,
            romantic: jokeData.romantic_reasons,
            meta: jokeData.meta_reasons
        };

        // Заполняем специфичные плейсхолдеры
        Object.keys(typeSpecificData).forEach(key => {
            const placeholder = `{${key}_reason}`;
            if (joke.includes(placeholder)) {
                joke = joke.replace(placeholder, this.getRandomItem(typeSpecificData[key]));
            }
        });

        // Заполняем остальные плейсхолдеры
        joke = joke.replace('{animal}', this.getRandomItem(jokeData.animals));
        joke = joke.replace('{tech_thing}', this.getRandomItem(['компьютер', 'сервер', 'алгоритм', 'баг', 'код', 'программа']));
        joke = joke.replace('{historical_period}', this.getRandomItem(jokeData.historical_periods));
        joke = joke.replace('{magical_reason}', this.getRandomItem(jokeData.magical_reasons));
        joke = joke.replace('{romantic_reason}', this.getRandomItem(jokeData.romantic_reasons));
        joke = joke.replace('{meta_reason}', this.getRandomItem(jokeData.meta_reasons));

        return joke;
    }

    getCharacter() {
        if (this.currentSettings.character === 'random') {
            return this.getRandomItem(jokeData.characters);
        }
        
        const characterMap = {
            'old-lady': 'старушка',
            'cat-programmer': 'кот-программист',
            'alien-farmer': 'инопланетянин-дачник',
            'ancient-greek': 'древний грек',
            'robot-chef': 'робот-повар'
        };
        
        return characterMap[this.currentSettings.character] || 'неизвестный персонаж';
    }

    applyDeliveryStyle(joke) {
        const styles = {
            'anecdote': joke,
            'tabloid': `СЕНСАЦИЯ! ${joke.toUpperCase()}!`,
            'scientific': `Исследование показало: ${joke}`,
            'wisdom': `Древняя мудрость гласит: "${joke}"`,
            'error': `ОШИБКА 404: ${joke} - Файл не найден`
        };
        
        return styles[this.currentSettings.deliveryStyle] || joke;
    }

    generateHistory() {
        this.showLoading();
        
        setTimeout(() => {
            const history = this.createHistory();
            this.displayHistory(history);
            this.hideLoading();
        }, 1500);
    }

    createHistory() {
        const templates = storyTemplates[this.historySettings.realism];
        const template = this.getRandomItem(templates);
        
        let story = this.fillStoryTemplate(template);
        
        return {
            text: story,
            settings: { ...this.historySettings },
            timestamp: new Date().toISOString()
        };
    }

    fillStoryTemplate(template) {
        let story = template;
        
        // Заполняем плейсхолдеры
        story = story.replace('{location}', this.getRandomItem(storyData.locations));
        story = story.replace('{year}', this.getRandomItem(storyData.years));
        story = story.replace('{character}', this.getCharacter());
        story = story.replace('{action}', this.getRandomItem(jokeData.actions));
        story = story.replace('{research_institution}', this.getRandomItem(storyData.research_institutions));
        story = story.replace('{scientific_explanation}', this.getRandomItem(storyData.scientific_explanations));
        story = story.replace('{field_of_study}', this.getRandomItem(storyData.fields_of_study));
        story = story.replace('{archive_location}', this.getRandomItem(storyData.archive_locations));
        story = story.replace('{detailed_descriptions}', this.getRandomItem(storyData.detailed_descriptions));
        story = story.replace('{archaeological_evidence}', this.getRandomItem(storyData.archaeological_evidence));
        story = story.replace('{local_story}', this.getRandomItem(storyData.local_stories));
        story = story.replace('{chronicler}', this.getRandomItem(storyData.chroniclers));
        story = story.replace('{local_tradition}', this.getRandomItem(storyData.local_traditions));
        story = story.replace('{doubtful_reason}', this.getRandomItem(storyData.doubtful_reasons));
        story = story.replace('{suspicious_details}', this.getRandomItem(storyData.suspicious_details));
        story = story.replace('{unusual_details}', this.getRandomItem(storyData.unusual_details));
        story = story.replace('{fictional_location}', this.getRandomItem(storyData.fictional_locations));
        story = story.replace('{fictional_year}', this.getRandomItem(storyData.fictional_years));
        story = story.replace('{fictional_circumstances}', this.getRandomItem(storyData.fictional_circumstances));
        story = story.replace('{fictional_universe}', this.getRandomItem(storyData.fictional_universes));
        story = story.replace('{magical_events}', this.getRandomItem(storyData.magical_events));
        story = story.replace('{magical_consequences}', this.getRandomItem(storyData.magical_consequences));
        story = story.replace('{cosmic_events}', this.getRandomItem(storyData.cosmic_events));
        story = story.replace('{fictional_dimension}', this.getRandomItem(storyData.fictional_dimensions));
        
        return story;
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    showLoading() {
        document.getElementById('loading-animation').style.display = 'block';
        document.getElementById('joke-result').style.display = 'none';
        document.getElementById('history-result').style.display = 'none';
        document.getElementById('result-actions').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading-animation').style.display = 'none';
    }

    displayJoke(joke) {
        document.getElementById('joke-text').textContent = joke.text;
        document.getElementById('joke-result').style.display = 'block';
        document.getElementById('result-actions').style.display = 'flex';
        
        // Сохраняем в галерею
        this.gallery.push(joke);
        this.updateGallery();
    }

    displayHistory(history) {
        document.getElementById('history-text').textContent = history.text;
        document.getElementById('history-result').style.display = 'block';
    }

    showHistory() {
        if (document.getElementById('history-result').style.display === 'none') {
            this.generateHistory();
        }
    }

    resetSettings() {
        // Сбрасываем все настройки к значениям по умолчанию
        this.currentSettings = {
            type: 'random',
            funnyLevel: 5,
            absurdLevel: 5,
            darkLevel: 5,
            complexLevel: 5,
            punsLevel: 'none',
            surpriseEnding: false,
            character: 'random',
            requiredWord: '',
            theme: '',
            deliveryStyle: 'anecdote'
        };

        // Обновляем UI
        document.querySelectorAll('.joke-type-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.joke-type-btn[data-type="random"]').classList.add('active');
        
        document.querySelectorAll('.slider').forEach(slider => {
            slider.value = 5;
            this.updateSliderIndicator(slider);
        });

        document.getElementById('puns-level').value = 'none';
        document.getElementById('surprise-ending').checked = false;
        document.getElementById('character').value = 'random';
        document.getElementById('required-word').value = '';
        document.getElementById('theme').value = '';
        document.getElementById('delivery-style').value = 'anecdote';
    }

    saveShare() {
        const joke = document.getElementById('joke-text').textContent;
        const history = document.getElementById('history-text').textContent;
        
        const content = `ШУТКА:\n${joke}\n\nИСТОРИЯ ПРОИСХОЖДЕНИЯ:\n${history}\n\nСоздано в Генераторе Ржача PRO`;
        
        // Создаем временный элемент для копирования
        const textArea = document.createElement('textarea');
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Шутка и история скопированы в буфер обмена!');
    }

    loadGallery() {
        // Загружаем сохраненные шутки из localStorage
        const saved = localStorage.getItem('jokeGallery');
        if (saved) {
            this.gallery = JSON.parse(saved);
            this.updateGallery();
        }
    }

    updateGallery() {
        // Сохраняем в localStorage
        localStorage.setItem('jokeGallery', JSON.stringify(this.gallery));
        
        // Обновляем отображение
        this.displayGallery();
    }

    displayGallery() {
        const grid = document.getElementById('gallery-grid');
        grid.innerHTML = '';
        
        this.gallery.slice(-6).reverse().forEach(joke => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.innerHTML = `
                <h4>${this.getTypeName(joke.type)}</h4>
                <p>${joke.text.substring(0, 100)}${joke.text.length > 100 ? '...' : ''}</p>
            `;
            card.addEventListener('click', () => {
                this.displayJoke(joke);
            });
            grid.appendChild(card);
        });
    }

    filterGallery(filter) {
        const grid = document.getElementById('gallery-grid');
        grid.innerHTML = '';
        
        let filteredGallery = this.gallery;
        if (filter !== 'all') {
            filteredGallery = this.gallery.filter(joke => joke.type === filter);
        }
        
        filteredGallery.slice(-6).reverse().forEach(joke => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.innerHTML = `
                <h4>${this.getTypeName(joke.type)}</h4>
                <p>${joke.text.substring(0, 100)}${joke.text.length > 100 ? '...' : ''}</p>
            `;
            card.addEventListener('click', () => {
                this.displayJoke(joke);
            });
            grid.appendChild(card);
        });
    }

    getTypeName(type) {
        const typeNames = {
            'absurd': 'Абсурдная',
            'stupid': 'Тупая',
            'dark': 'Чернушная',
            'science': 'Научная',
            'everyday': 'Бытовая',
            'animals': 'Про животных',
            'it': 'IT',
            'historical': 'Историческая',
            'fantasy': 'Фантастическая',
            'romantic': 'Романтическая',
            'meta': 'Мета-юмор',
            'random': 'Случайная'
        };
        return typeNames[type] || 'Неизвестная';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new JokeGenerator();
}); 