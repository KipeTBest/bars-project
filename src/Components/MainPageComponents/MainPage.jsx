import Header from "../Header/Header";
import "./MainPage.css"
import Comedia from "./Comedia/Comedia";
import Parallelogram from "./Parallelogram/Parallelogram";
import FirstSlider from "./FirstSlider/FirstSlider";
import YourName from "./YourName/YourName";
import Romantic from "./Romantic/Romantic";
import Horrors from "./Horrors/Horrors";

function MainPage() {

    console.log(JSON.parse(localStorage.getItem('data')))
    
    const data = [
        {
            id: 1,
            img: "https://papik.pro/grafic/uploads/posts/2023-04/1681383842_papik-pro-p-plakat-avatar-2009-19.jpg",
            text: "Аватар: путь воды"
        },
        {
            id: 2,
            img: "//avatars.mds.yandex.net/get-entity_search/1670941/904761108/S168x252_2x",
            text: "Майор гром: игра"
        },
        {
            id: 3,
            img: "https://papik.pro/grafic/uploads/posts/2023-04/1681383842_papik-pro-p-plakat-avatar-2009-19.jpg",
            text: "Аватар: путь воды"
        },
        {
            id: 4,
            img: "//avatars.mds.yandex.net/get-entity_search/1670941/904761108/S168x252_2x",
            text: "Майор гром: игра"
        },
        {
            id: 5,
            img: "https://papik.pro/grafic/uploads/posts/2023-04/1681383842_papik-pro-p-plakat-avatar-2009-19.jpg",
            text: "Аватар: путь воды"
        },
        {
            id: 6,
            img: "//avatars.mds.yandex.net/get-entity_search/1670941/904761108/S168x252_2x",
            text: "Майор гром: игра"
        },
        {
            id: 7,
            img: "https://papik.pro/grafic/uploads/posts/2023-04/1681383842_papik-pro-p-plakat-avatar-2009-19.jpg",
            text: "Аватар: путь воды"
        },
        {
            id: 8,
            img: "//avatars.mds.yandex.net/get-entity_search/1670941/904761108/S168x252_2x",
            text: "Майор гром: игра"
        },
        {
            id: 9,
            img: "https://papik.pro/grafic/uploads/posts/2023-04/1681383842_papik-pro-p-plakat-avatar-2009-19.jpg",
            text: "Аватар: путь воды"
        },
        {
            id: 10,
            img: "//avatars.mds.yandex.net/get-entity_search/1670941/904761108/S168x252_2x",
            text: "Майор гром: игра"
        },
        {
            id: 11,
            img: "https://papik.pro/grafic/uploads/posts/2023-04/1681383842_papik-pro-p-plakat-avatar-2009-19.jpg",
            text: "Аватар: путь воды"
        },
        {
            id: 12,
            img: "//avatars.mds.yandex.net/get-entity_search/1670941/904761108/S168x252_2x",
            text: "Майор гром: игра"
        },
        {
            id: 13,
            img: "https://papik.pro/grafic/uploads/posts/2023-04/1681383842_papik-pro-p-plakat-avatar-2009-19.jpg",
            text: "Аватар: путь воды"
        },
        {
            id: 14,
            img: "//avatars.mds.yandex.net/get-entity_search/1670941/904761108/S168x252_2x",
            text: "Майор гром: игра"
        },
    ]
    return (
      <div className="MainPage">
        <div className="headerYourName">
            <YourName/>
            <FirstSlider data={data}/>
            <Parallelogram/>
        </div>
        <Comedia data={data}/>
        <Romantic data={data}/>
        <Horrors data={data}/>
      </div>
    );
  }
  
  export default MainPage;
  