ymaps.ready(init);
var myMap;

function init () {
    var myPlacemark, myMap = new ymaps.Map("map", {
        center: [60.0762,30.304108], 
        zoom: 15
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    }),
    objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true
        });
    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    // myMap.geoObjects.add(objectManager);
    // $.ajax({
    //     url: "http://autofill.test-easy-it.ru/data.json"
    // }).done(function(data) {
    //     objectManager.add(data);
    // });

    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
            }
            $('#exampleModal').arcticmodal();
            $("#coords").val(coords);
            // myMap.balloon.open(coords, {
            //     contentHeader:'Событие!',
            //     contentBody:'<p>Кто-то щелкнул по карте.</p>' +
            //         '<p>Координаты щелчка: ' + [
            //         coords[0].toPrecision(6),
            //         coords[1].toPrecision(6)
            //         ].join(', ') + '</p>',
            //     contentFooter:'<sup>Щелкните еще раз</sup>'
            // });
        }
        else {
            myMap.balloon.close();
        }
    });

     // После того как данные YmapsMl-файла загрузятся, вызывается callback-функция.
    // ymaps.geoXml.load('data.xml')
    //     .then(function (res) {
    //         // Добавление коллекции геообъектов на карту.
    //         myMap.geoObjects.add(res.geoObjects);
    //     }, function (error) {
    //         alert('При загрузке стилей произошла ошибка: ' + error);
    //     });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: ''
        }, {
            draggable: true,
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/sport.svg',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });
    }

    


    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
}
