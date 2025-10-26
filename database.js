// database.js - Виртуальная база данных для сайта Pepsora

// Инициализация базы данных
function initializeDatabase() {
    // Проверяем, существует ли уже база данных
    if (!sessionStorage.getItem('pepsoraDatabase')) {
        // Создаем структуру базы данных
        const database = {
            users: [], // Таблица пользователей
            articles: [], // Таблица статей
            nextUserId: 1, // Следующий ID для пользователя
            nextArticleId: 1 // Следующий ID для статьи
        };
        
        // Добавляем демо-пользователя
        database.users.push({
            id: database.nextUserId++,
            name: "Демо Пользователь", // Исправлено: username -> name
            email: "demo@example.com",
            password: "password123", // В реальном приложении пароли нужно хэшировать!
            avatarInitial: "Д", // Исправлено: avatar -> avatarInitial
            registrationDate: new Date().toISOString(),
            articlesCount: 0,
            likesCount: 0,
            viewsCount: 0,
            articleIds: [] // Массив ID статей, написанных этим пользователем
        });
        
        // Добавляем демо-статьи
        const demoArticles = [
            {
                title: "5 способов увеличить доход фрилансера в 2024 году",
                content: "Откройте для себя проверенные стратегии для увеличения дохода от фриланса: от повышения ставок до поиска премиальных клиентов. В современном мире фриланс становится все более популярным способом заработка. Многие люди выбирают фриланс как основной источник дохода, а некоторые используют его как дополнительный заработок. Чтобы успешно работать на фрилансе, важно не только иметь профессиональные навыки, но и уметь правильно организовать свою работу, находить клиентов и управлять финансами. В этой статье мы рассмотрим пять эффективных способов, которые помогут вам увеличить свой доход на фрилансе в 2024 году. Эти стратегии основаны на опыте успешных фрилансеров и актуальных тенденциях рынка. Независимо от того, только начинаете ли вы свой путь на фрилансе или уже имеете опыт, эти советы помогут вам вывести свой доход на новый уровень.",
                category: "freelance",
                hashtags: "#фриланс #доход #2024 #советы",
                status: "published",
                authorId: 1,
                date: new Date().toISOString(),
                views: 342,
                likes: 28,
                likedBy: []
            },
            {
                title: "Как развить Telegram-канал до 10K подписчиков",
                content: "Узнайте секреты успешных владельцев Telegram-каналов и как использовать наш будущий сервис Uppy. Создание и развитие Telegram-канала может быть отличным способом не только для самовыражения, но и для монетизации. Однако, чтобы канал стал успешным и привлекательным для аудитории, нужно приложить немало усилий. В этой статье мы расскажем, как развить Telegram-канал до 10 тысяч подписчиков. Мы поделимся проверенными стратегиями, которые помогут вам привлечь аудиторию, удержать подписчиков и сделать ваш канал популярным. Вы узнаете, как правильно выбирать тематику канала, создавать контент, который будет интересен вашей целевой аудитории, и продвигать канал с помощью различных инструментов. Также мы рассмотрим, как анализировать статистику канала и использовать полученные данные для улучшения контента. Наш будущий сервис Uppy поможет вам автоматизировать многие процессы, связанные с ведением Telegram-канала, что сэкономит ваше время и повысит эффективность работы.",
                category: "blogging",
                hashtags: "#telegram #рост #блоггинг",
                status: "published",
                authorId: 1,
                date: new Date().toISOString(),
                views: 287,
                likes: 19,
                likedBy: []
            },
            {
                title: "Полное руководство по заработку звезд в Telegram",
                content: "Максимизируйте свой доход с помощью нашего сервиса Onи, выполняя простые задания, оплачиваемые звездами Telegram. Звезды Telegram — это новая валюта, которая позволяет пользователям поддерживать своих любимых авторов и создателей контента. Заработок звезд в Telegram стал популярным способом монетизации для многих пользователей. В этой статье мы расскажем, как можно зарабатывать звезды в Telegram, выполняя простые задания. Вы узнаете, какие задания доступны, сколько звезд можно заработать за их выполнение и как выводить заработанные звезды. Наш сервис Onи помогает пользователям находить задания, которые подходят именно им, и получать вознаграждение в виде звезд. Мы также расскажем, как можно создавать свои задания и продвигать свои сервисы с помощью звезд. Это отличная возможность не только заработать, но и привлечь новую аудиторию к своим проектам. Следуя нашим советам, вы сможете максимизировать свой доход и сделать процесс заработка звезд в Telegram максимально эффективным и приятным.",
                category: "earnings",
                hashtags: "#telegram #звезды #заработок",
                status: "published",
                authorId: 1,
                date: new Date().toISOString(),
                views: 256,
                likes: 23,
                likedBy: []
            }
        ];
        
        // Добавляем статьи в базу данных
        demoArticles.forEach(article => {
            article.id = database.nextArticleId++;
            database.articles.push(article);
        });
        
        // Обновляем счетчики у пользователя
        const demoUser = database.users.find(u => u.id === 1);
        if (demoUser) {
            demoUser.articlesCount = database.articles.length;
            demoUser.likesCount = database.articles.reduce((sum, article) => sum + article.likes, 0);
            demoUser.viewsCount = database.articles.reduce((sum, article) => sum + article.views, 0);
            demoUser.articleIds = database.articles.map(article => article.id);
        }
        
        // Сохраняем базу данных в sessionStorage
        sessionStorage.setItem('pepsoraDatabase', JSON.stringify(database));
        console.log("База данных успешно инициализирована");
    }
}

// Функция для получения базы данных
function getDatabase() {
    const dbString = sessionStorage.getItem('pepsoraDatabase');
    if (!dbString) {
        initializeDatabase();
        return JSON.parse(sessionStorage.getItem('pepsoraDatabase'));
    }
    return JSON.parse(dbString);
}

// Функция для сохранения базы данных
function saveDatabase(database) {
    sessionStorage.setItem('pepsoraDatabase', JSON.stringify(database));
}

// Функция регистрации нового пользователя
function registerUser(name, email, password) {
    const db = getDatabase();
    
    // Проверяем, не существует ли уже пользователь с таким email
    const existingUser = db.users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: "Пользователь с таким email уже существует" };
    }
    
    // Создаем нового пользователя
    const newUser = {
        id: db.nextUserId++,
        name: name,
        email: email,
        password: password, // В реальном приложении нужно хэшировать пароль!
        avatarInitial: name.charAt(0).toUpperCase(),
        registrationDate: new Date().toISOString(),
        articlesCount: 0,
        likesCount: 0,
        viewsCount: 0,
        articleIds: []
    };
    
    // Добавляем пользователя в базу данных
    db.users.push(newUser);
    saveDatabase(db);
    
    return { success: true, message: "Регистрация прошла успешно", user: newUser };
}

// Функция входа пользователя
function loginUser(email, password) {
    const db = getDatabase();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
        // Сохраняем информацию о текущем пользователе
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user: user };
    } else {
        return { success: false, message: "Неверный email или пароль" };
    }
}

// Функция создания новой статьи
function createArticle(title, content, category, hashtags, status, authorId) {
    const db = getDatabase();
    
    // Создаем новую статью
    const newArticle = {
        id: db.nextArticleId++,
        title: title,
        content: content,
        category: category,
        hashtags: hashtags,
        status: status, // 'published' или 'draft'
        authorId: authorId,
        date: new Date().toISOString(),
        views: 0,
        likes: 0,
        likedBy: [],
        imageUrl: null
    };
    
    // Добавляем статью в базу данных
    db.articles.push(newArticle);
    
    // Обновляем информацию о пользователе
    const author = db.users.find(u => u.id === authorId);
    if (author) {
        author.articlesCount += 1;
        author.articleIds.push(newArticle.id);
    }
    
    saveDatabase(db);
    return { success: true, article: newArticle };
}

// Функция получения статей пользователя
function getUserArticles(userId) {
    const db = getDatabase();
    return db.articles.filter(article => article.authorId === userId);
}

// Функция обновления профиля пользователя
function updateProfile(userId, newName, newEmail) {
    const db = getDatabase();
    const user = db.users.find(u => u.id === userId);
    if (!user) {
        return { success: false, message: "Пользователь не найден" };
    }
    
    // Обновляем данные пользователя
    user.name = newName;
    user.email = newEmail;
    user.avatarInitial = newName.charAt(0).toUpperCase();
    
    // Также обновляем текущего пользователя, если он авторизован
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (currentUser.id === userId) {
        currentUser.name = newName;
        currentUser.email = newEmail;
        currentUser.avatarInitial = newName.charAt(0).toUpperCase();
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    saveDatabase(db);
    return { success: true, message: "Профиль успешно обновлен", user: user };
}

// Функция удаления статьи
function deleteArticle(articleId, userId) {
    const db = getDatabase();
    
    // Находим статью
    const articleIndex = db.articles.findIndex(a => a.id === articleId);
    if (articleIndex === -1) {
        return { success: false, message: "Статья не найдена" };
    }
    
    // Проверяем, принадлежит ли статья пользователю
    if (db.articles[articleIndex].authorId !== userId) {
        return { success: false, message: "У вас нет прав на удаление этой статьи" };
    }
    
    const articleToDelete = db.articles[articleIndex];
    
    // Удаляем статью
    db.articles.splice(articleIndex, 1);
    
    // Обновляем информацию о пользователе
    const user = db.users.find(u => u.id === userId);
    if (user) {
        user.articlesCount = Math.max(0, user.articlesCount - 1);
        user.likesCount = Math.max(0, user.likesCount - articleToDelete.likes);
        user.viewsCount = Math.max(0, user.viewsCount - articleToDelete.views);
        user.articleIds = user.articleIds.filter(id => id !== articleId);
    }
    
    saveDatabase(db);
    return { success: true, message: "Статья успешно удалена" };
}

// Функция постановки/снятия лайка
function toggleLike(articleId, userId) {
    const db = getDatabase();
    const article = db.articles.find(a => a.id === articleId);
    if (!article) {
        return { success: false, message: "Статья не найдена" };
    }
    
    // Инициализируем массив лайков, если его нет
    if (!article.likedBy) {
        article.likedBy = [];
    }
    
    const userIndex = article.likedBy.indexOf(userId);
    if (userIndex === -1) {
        // Добавляем лайк
        article.likedBy.push(userId);
        article.likes = article.likedBy.length;
        
        // Обновляем статистику пользователя
        const author = db.users.find(u => u.id === article.authorId);
        if (author) {
            author.likesCount = (author.likesCount || 0) + 1;
        }
    } else {
        // Убираем лайк
        article.likedBy.splice(userIndex, 1);
        article.likes = article.likedBy.length;
        
        // Обновляем статистику пользователя
        const author = db.users.find(u => u.id === article.authorId);
        if (author) {
            author.likesCount = Math.max(0, (author.likesCount || 0) - 1);
        }
    }
    
    saveDatabase(db);
    return { success: true, likes: article.likes, liked: userIndex === -1 };
}

// Функция получения популярных статей (по лайкам)
function getPopularArticles(limit = 3) {
    const db = getDatabase();
    // Сортируем статьи по лайкам и возвращаем топ-N
    return [...db.articles]
        .filter(article => article.status === 'published')
        .sort((a, b) => b.likes - a.likes)
        .slice(0, limit);
}

// Функция получения статистики
function getStatistics() {
    const db = getDatabase();
    return {
        totalArticles: db.articles.filter(article => article.status === 'published').length,
        totalUsers: db.users.length,
        totalViews: db.articles.reduce((sum, article) => sum + article.views, 0),
        totalLikes: db.articles.reduce((sum, article) => sum + article.likes, 0)
    };
}

// Функция полной очистки базы данных
function clearDatabase() {
    // Очищаем базу данных
    sessionStorage.removeItem('pepsoraDatabase');
    sessionStorage.removeItem('currentUser');
    return { success: true, message: "База данных успешно очищена" };
}

// Инициализируем базу данных при загрузке
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeDatabase();
    });
}

// Экспортируем все функции для использования в других файлах
const PepsoraDB = {
    initializeDatabase,
    getDatabase,
    saveDatabase,
    registerUser,
    loginUser,
    createArticle,
    getUserArticles,
    updateProfile,
    deleteArticle,
    toggleLike,
    getPopularArticles,
    getStatistics,
    clearDatabase
};

// Делаем доступным глобально
if (typeof window !== 'undefined') {
    window.PepsoraDB = PepsoraDB;
}

// Для использования в модульных системах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PepsoraDB;
}