const axios = require("axios");
const fs = require("fs");

async function getVacancies() {
    try {
        const searchUrl = "https://api.hh.ru/vacancies";
        const queryParams = {
            text: "Node.js developer", // запрос для вакансий Node.js
            area: 1, // код региона, например, 1 для Москвы
            per_page: 25, // количество вакансий на странице
        };

        const response = await axios.get(searchUrl, { params: queryParams });
        return response.data.items;
    } catch (error) {
        console.error("Ошибка при выполнении запроса к API HeadHunter:", error);
        return null;
    }
}

async function main() {
    const vacancies = await getVacancies();
    if (vacancies) {
        fs.writeFileSync(
            "nodejs_vacancies.json",
            JSON.stringify(vacancies, null, 4)
        );
        console.log("Данные о вакансиях успешно сохранены.");
    } else {
        console.log("Не удалось получить данные о вакансиях.");
    }
}

main();
