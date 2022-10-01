const ctx = document.getElementById("myChart");
const config = {
  type: "line",
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    datasets: [
      {
        label: "SCJ",
        data: [1233, 12000000, 12500000, 10000000],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "PNJ",
        data: [7000000, 12000000, 2250000, 1400000],
        fill: false,
        borderColor: "rgb(158, 154, 89)",
        tension: 0.1,
      },
    ],
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  },
  scales: {
    y: {
      // defining min and max so hiding the dataset does not change scale range
      min: 0,
      max: 100,
    },
  },
};
const myChart = new Chart(ctx, config);

const goldType = document.getElementById("type");
const goldBrand = document.getElementById("gold-brand");
const priceSell = document.getElementById("price-sell");
const priceBuy = document.getElementById("price-buy");

const getData = (goldBrand = "SCJ") => {
  fetch(`http://127.0.0.1:8000/api/v1/gold/${goldBrand}`)
    .then((data) => data.json())
    .then((d) => {
      goldBrand.innerText = d[0].tenvang;
      priceSell.innerText = d[0].giaban.toLocaleString();
      priceBuy.innerText = d[0].giamua.toLocaleString();
      goldType.value = goldBrand;
    })
    .catch((err) => {
      console.error(err);
    });
};
getData();

goldType.addEventListener("change", (e) => {
  getData(e.target.value);
});
