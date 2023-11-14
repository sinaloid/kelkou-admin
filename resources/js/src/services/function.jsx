const makeSearch = (e, setList, datas, keys) => {
    e.preventDefault();
    let str = e.target.value;
    let dd = datas.filter((data) => {
        //console.log(verify(str, keys, data))
        return verify(str, keys, data) && data;
    });

    console.log(dd.length);
    dd.length !== 0 ? setList(dd) : setList(datas);
};

const verify = (str, keys, data) => {
    let isTrue = false;

    keys.forEach((key) => {
        if (data[key]?.toLowerCase().includes(str.toLowerCase())) {
            isTrue = isTrue || true;
        }
    });
    return isTrue;
};

const formatDate = (originalDate) => {
    const parts = originalDate?.split("-"); // Divise la chaîne de date en parties

    // Récupère les parties de la date (année, mois, jour)
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Crée une nouvelle date avec les parties récupérées
    const formattedDate = new Date(year, month - 1, day);

    // Récupère les informations de la date formatée
    const formattedDay = String(formattedDate.getDate()).padStart(2, "0");
    const formattedMonth = String(formattedDate.getMonth() + 1).padStart(
        2,
        "0"
    );
    const formattedYear = formattedDate.getFullYear();

    // Formate la date au format souhaité (jour/mois/année)
    const formattedDateString = `${formattedDay}/${formattedMonth}/${formattedYear}`;

    return formattedDateString;
};

const pagination = (datas, pageNumber = 6) => {
    let i = 0;
    let counter = 0;
    let length = 1;
    let list = [];
    let tab = [];

    datas.forEach((data) => {
        if (i === (pageNumber - 1) || length === datas.length) {
            list = [...list, [...tab, data]];
            tab = [];
            counter = counter + 1;
            i = 0;
        } else {
            tab = [...tab, data];
            i = i + 1;
        }

        length = length + 1;
    });

    return {
        list: list,
        counter: counter,
        index:0
    };
};

export { makeSearch, formatDate,pagination };
