import { InMemoryDbService } from 'angular-in-memory-web-api';

export class KeyboardData implements InMemoryDbService {

  createDb() {
    let keyboards = [
      {
        "id": 1,
        "title": "First Keyboard",
        "price": 24.99,
        "description": "Cheap mechanical keyboard.",
        "image": "https://www.pcgamesn.com/wp-content/uploads/2018/07/Best-compact-gaming-keyboard-runner-up-Wooting-One-Analogue-Keyboard.png"
      },
      {
        "id": 2,
        "title": "Second Keyboard",
        "price": 100.99,
        "description": "Top tier keyboard",
        "image": "https://cdn.mos.cms.futurecdn.net/gV598KV2biGiEUgQZSfiY.jpg"
      },
      {
        "id": 3,
        "title": "Third Keyboard",
        "price": 64.99,
        "description": "Good looking keyboard",
        "image": "https://www.discoazul.com/uploads/media/images/teclado-gaming-thunder-x3-tk15-12.jpg"
      },
      {
        "id": 4,
        "title": "Fourth Keyboard",
        "price": 29.99,
        "description": "Very cheap very good buy it!",
        "image": "https://www.miro.es/media/catalog/product/cache/1/image/3c227666daff9c2151d9f326ee64fd4f/i/m/image_9b89c96e4b18375906b9729fc63defb6_1584763637.jpg"
      }
    ];
    return { keyboards: keyboards };
  }
}
