export default class ProductsService {

    data = [
        {
            id: 1,
            name: 'Samsung Galaxy S10+',
            group: 'samsung',
            color: ['black','white','gray'],
            processor: ['2.7 GHz'],
            geheugen: '128 GB',
            price: '52 300 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/435/13.jpg/resize/483x483/hq/'
        },
        {
            id: 2,
            name: 'Samsung Galaxy A30s',
            group: 'samsung',
            color: ['white','gray'],
            processor: [ '1.9 GHz'],
            geheugen: '32 GB',
            price: '13 990 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/a2c/ru-galaxy-a30s-a307-sm-a307fzluser-front-182094534.jpg/resize/483x483/hq/'
        },
        {
            id: 3,
            name: 'Apple iPhone 11 128GB',
            group: 'apple',
            color: ['black','white','gray', 'green'],
            processor: [ '2.3 GHz'],
            geheugen: '128 GB',
            price: '49 900 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/97c/13.jpg/resize/483x483/hq/',
           
        },
        {
            id: 4,
            name: 'Apple iPhone 11 256GB',
            group: 'apple',
            color: ['black','white','gray', 'green'],
            processor: [ '2.3 GHz'],
            geheugen: '256 GB',
            price: '73 900 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/97c/13.jpg/resize/483x483/hq/',
            
        },
        {
            id: 5,
            name: 'Honor 10i 64GB',
            group: 'honor',
            color: ['black', 'shimmering blue', 'flickering red'],
            processor: [ '2.3 GHz'],
            geheugen: '64 GB',
            price: '14 990 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/0af/img_7996.jpg/resize/483x483/hq/',
            
        },
        {
            id: 6,
            name: 'Xiaomi Redmi Note 8T 4/64GB',
            group: 'xiaomi',
            color: ['blue'],
            processor: [ '2.3 GHz'],
            geheugen: '64 GB',
            price: '15 990 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/dbf/20.jpg/resize/483x483/hq/',
            
        },
        {
            id: 7,
            name: 'ZTE Blade 20 Smart',
            group: 'zte',
            color: ['blue'],
            processor: [ '2.7 GHz'],
            geheugen: '128 GB',
            price: '14 990 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/183/14.jpg/resize/483x483/hq/',
            
        },
        {
            id: 8,
            name: 'ZTE Blade 20 Smart',
            group: 'zte',
            color: ['black'],
            processor: [ '2.3 GHz'],
            geheugen: '64 GB',
            price: '11 990 руб.',
            src: 'https://cdn.svyaznoy.ru/upload/iblock/183/14.jpg/resize/483x483/hq/',
            
        },
    ];
    getProducts() {
        return new  Promise((resolve, reject) =>{
            setTimeout(()=>{
                if(Math.random() < 0.25) {
                    reject(new Error('Not found resolve getProducts'))
                }
                resolve(this.data)
            }, 700)
        })
    }
}