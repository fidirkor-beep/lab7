var groupmates = [
    {
        "name": "Олег",
        "surname": "Сорокоумов",
        "group": "БСТ2351",
        "marks": [5, 5, 5]
    },
    {
        "name": "Михаил",
        "surname": "Березин",
        "group": "БСТ2352",
        "marks": [4, 5, 4]
    },
    {
        "name": "Егор",
        "surname": "Ганин",
        "group": "БСТ2353",
        "marks": [5, 3, 4]
    },
    {
        "name": "Артём",
        "surname": "Бреусов",
        "group": "БСТ2351",
        "marks": [3, 4, 3]
    },
    {
        "name": "Марк",
        "surname": "Мануйлов",
        "group": "БСТ2352",
        "marks": [4, 3, 5]
    },
    {
        "name": "Александр",
        "surname": "Тищенко",
        "group": "БСТ2353",
        "marks": [3, 3, 5]
    }
];
// console.log(groupmates);
var rpad = function(str, length) {
    str = str.toString();
    while (str.length < length)
        str = str + ' ';
    return str;
};

var printStudents = function(students) {
    console.log(
        rpad("Имя", 15),
        rpad("Фамилия", 15),
        rpad("Группа", 8),
        rpad("Оценки", 20)
    );
    for (var i = 0; i <= students.length - 1; i++) {
        console.log(
            rpad(students[i]['name'], 15),
            rpad(students[i]['surname'], 15),
            rpad(students[i]['group'], 8),
            rpad(students[i]['marks'], 20)
        );
    }
    console.log('\n');
};

printStudents(groupmates);
// Фильтрация студентов по группе
var filterByGroup = function(students) {
    var group = prompt("Введите название группы для фильтрации:");

    if (group === null) {
        // пользователь нажал «Отмена»
        return;
    }

    group = group.trim();

    var result = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i]['group'] === group) {
            result.push(students[i]);
        }
    }

    if (result.length === 0) {
        console.log("Студентов в группе '" + group + "' не найдено.");
        return;
    }

    console.log("Студенты группы " + group + ":");
    printStudents(result);
};

var averageMark = function(student) {
    var marks = student['marks'];
    var sum = 0;
    for (var i = 0; i < marks.length; i++) sum += marks[i];
    return sum / marks.length;
};

var filterByAverage = function(students) {
    var input = prompt("Введите минимальный средний балл:");
    if (input === null) return;

    input = input.trim().replace(',', '.');
    var threshold = parseFloat(input);

    if (isNaN(threshold)) {
        console.log("Некорректное значение среднего балла: '" + input + "'");
        return;
    }

    var result = [];
    for (var i = 0; i < students.length; i++) {
        if (averageMark(students[i]) > threshold) result.push(students[i]);
    }

    if (result.length === 0) {
        console.log("Студентов со средним баллом выше " + threshold + " не найдено.");
        return;
    }
    console.log("Студенты со средним баллом выше " + threshold + ":");
    printStudents(result);
};


// запуск
filterByGroup(groupmates);
setTimeout(function() {
    filterByAverage(groupmates);
}, 300);