const axios = require("axios");
const fs = require("fs");

async function getVacancies() {
    try {
        const searchUrl = "https://api.hh.ru/vacancies";
        const queryParams = {
            text: "Nodejs Node.js NOT Senior NOT QA NOT PHP NOT frontend NOT React NOT Go NOT DevOps NOT Golang NOT Python", // запрос для вакансий Node.js, NOT перед словом для исключения
            area: 113, // код региона, например, 1 для Москвы, 88 Казань, 113 вся Россия
            per_page: 25, // количество вакансий на странице
            schedule: "remote", // удалёнка или офис. передавать remote или fullDay, shift, flexible, flyInFlyOut
        };

        const response = await axios.get(searchUrl, { params: queryParams });
        return response.data.items.map((vacancy) => ({
            vacancy_name: vacancy.name,
            area: vacancy.area.name,
            salary: vacancy.salary,
            status: vacancy.type.name,
            address: vacancy.address ? vacancy.address.city : "",
            created_at: vacancy.created_at,
            vacancy_url: vacancy.alternate_url,
            employer: vacancy.employer.name,
            requirement: vacancy.snippet.requirement,
            schedule: vacancy.schedule.name,
            professional_roles: vacancy.professional_roles
                ? vacancy.professional_roles.map((role) => role.name)
                : [],
            experience: vacancy.experience ? vacancy.experience.name : "",
            employment: vacancy.employment.name,
        }));
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
