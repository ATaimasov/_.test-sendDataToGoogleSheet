# Проект: "Запрос данных с сервера и их передача в гугл таблицу"

## Введение

Тестовое задание

### Информация: 
Документация по API находится по ссылке: http://94.103.91.4:5000/docs

### Требования
- Необходимо создать пользователя, получить токен авторизации API.
- Полученный токен отправлять в поле “Authorization” заголовка запроса.
- Результат выполнения программы - Google-таблица с данными по всем клиентам (все данные на 1 листе), включающие следующие поля:
    id,
    firstName,
    lastName,
    gender,
    address,
    city,
    phone,
    email,
    status

## Реализация

Данные обновляются в таблице: <a href="https://docs.google.com/spreadsheets/d/1yoi6OwqfY6iPBjidodr8aqdlINSt9mnju1U9KCr4roI/edit?hl=ru&gid=0#gid=0">тут</a>

<a href="./readme_dir/test-video.mp4">Посмотреть видео работы кода</a>

## Описание проекта 

Стек: 
- Node.js

## Установка и запуск проекта

```
git clone https://github.com/ATaimasov/_.test-sendDataToGoogleSheet
```

```
npm i
```

```
node .
```


