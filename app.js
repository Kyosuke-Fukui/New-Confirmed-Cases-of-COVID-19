
const getData = () => {

  const settings = getSettings()

  $.ajax(settings).done(function (response) {
    console.log(response);

    let cases = [0]
    // response.forEach(element => {
    //   cases.push(element['Cases'])
    // });
    for (let i = 1; i < response.length; i++) {
      cases.push(response[i]['Cases'] - response[i - 1]['Cases']);

    }

    let date = []
    response.forEach(element => {
      date.push(element['Date'].substring(0, 10))
    });
    // console.log(cases);
    // console.log(date);

    Plotly.plot("chart", [
      {
        x: date,
        y: cases,
        name: "japan",
        mode: "line",
        type: "scatter",
        line: {
          color: "red",
        }
      }
    ]);
  })

}

const getDaysRange = (days) => {
  let d = new Date()

  let from_d = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000))

  let to_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

  let from_date = `${from_d.getFullYear()}-${from_d.getMonth() + 1}-${from_d.getDate()}`

  return {
    start_date: from_date,
    end_date: to_date
  }
}

const getSettings = () => {
  let date = getDaysRange(30)

  // let url = `https://api.covid19api.com/country/japan/status/confirmed?from=${date.start_date}&to=${date.end_date}`
  let url = `https://api.covid19api.com/dayone/country/japan/status/confirmed`


  const settings = {
    async: true,
    crossDomain: true,
    url:
      `${url}`,
    method: "GET",
    dataType: "json",
  };
  return settings
}

getData();