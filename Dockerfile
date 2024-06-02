# Используем образ node для сборки
FROM mirror.gcr.io/library/node:16 as build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем образ nginx для сервировки статических файлов
FROM mirror.gcr.io/library/nginx:alpine

# Копируем сборку Vue из предыдущего этапа
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 5000
EXPOSE 5000

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
