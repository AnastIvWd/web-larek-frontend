# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных и типов
Товар
``` TS
export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}
```

Заказ
``` TS
export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
}
```

Интерфейс для модели данных 
``` TS
export interface IAppData {
  products: IProductItem[];
  preview: string | null; 
  cart: IProductItem[];
  order: IOrder;
  error: string | null;
  addProductInCart(product: IProductItem): void;
  deleteProductFromCart(productId: string): void;
  getCartItem(productId: string): IProductItem;
  checkValidation(data: TValidation):boolean;
  setPaymentInfo(paymentInfo: TPaymentInfo):void;
  setOrderContacts(contacts: TOrderContacts):void;
  resetCart():void;
  getItemsTotal(): number;
  getOrderData(): ApiOrderRequest;
}
```

Данные товара, используемые в модальном окне товара
``` TS
export type TProductInfo = Pick<IProductItem, 'category' | 'title' | 'description' | 'price'>;
```

Данные пользователя, необходимые для оформления заказа
``` TS
export type TPaymentInfo = Pick<IOrder, 'payment' | 'address'>;
```

Данные пользователя, необходимые для оформления заказа
``` TS
export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;
```

Данные, необходимые для валидации
``` TS
export type TValidation = TPaymentInfo | TOrderContacts;
```

Методы запроса
``` TS
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

Возвращаемый с сервера список
``` TS
export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};
```

Отправляемые на сервер данные запроса на создание заказа
``` TS
export type ApiOrderRequest = IOrder & {
  total: number,
  items: string[]
}
```

Возвращаемый с сервера ответ на запрос создания заказа
``` TS
export type ApiOrderResponse = {
  total: number,
  id: string
};
```

## Архитектура приложения
Код приложения разделен на слои согласно парадигме MVP:
- слой представления - отвечает за отображение данных на странице;
- слой данных - отвечает за хранение и изменение данных;
- презентер - отвечает за связь представления и данных.


### Базовый код

#### Класс `Api`
Содержит базовую логику для отправки запросов. Конструктор принимает базовый URL сервера и опциональный объект с заголовками запросов.\
Методы:
- `get` - выполняет GET запрос к указанному в параметрах эндпоинту и возвращает промис с объектом, полученным от сервера;
- `post` - принимает объект с данными, которые будут отправлены в JSON формате в теле запроса, и отправляет эти данные на указанный эндпоинт. По умолчанию используется метод `POST`, но его можно изменить, задав третий параметр при вызове метода.

#### Класс `EventEmitter`

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в различных слоях приложения для их генерации.\
Основные методы (описаны интерфейсом `IEvents`):
- `on` - устанавливает обработчик на событие;
- `emit` - вызывает событие;
- `trigger` - делает коллбек триггер, генерирующий событие при вызове.


### Слой данных

#### Класс `AppData `
Класс отвечает за хранению и логику работы всех данных, присутствующих в приложении.\
Конструктор класса получает объект брокера событий.\
В полях класса хранятся следующие данные:
- `_products: IProductItem[]` - массив объектов товаров;
- `_preview: string | null` - id выбранного товара, необходимый для открытия модалького окна и добавления товара в корзину;
- `_cart: IProductItem[]` - массив товаров, находящихся в корзине;
- `_order: IOrder` - данные, необходимые для оформления заказа;
- `error: string | null` - ошибки валидации форм
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных. 

Также класс содержит такие методы, как: 
- `addProductInCart(product: IProductItem): void` - добавляет товар в конец списка товаров в корзине;
- `deleteProductFromCart(productId: string): void` - удаляет товар из корзины
- `getCartItem(productId: string): IProductItem` - возвращает элемент из списка корзины
- `checkValidation(data: TValidation):boolean` - проверяет объект с данными заказа на валидность;
- `setPaymentInfo(paymentInfo: TPaymentInfo):void` - обновляет значение полей `address` и `payment`
- `setOrderContacts(contacts: TOrderContacts):void` - обновляет значение полей `email` и `phone`
- `resetCart():void` - обнуляет массив товаров в корзине при успешном оформлении заказа;
- `getItemsTotal(): number`  - считает итоговую сумму всех добавленных товаров в корзину;
- `getOrderData(): ApiOrderRequest` - формиерует тело запроса на сохранение заказа
- а так же геттеры для получения данных из полей класса.


### Классы предствления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных. 

#### Класс `ModalView`
Базовый класс отображения модальных окон в приложении. Конструктор принимает наследника `EventEmitter` и создает элемент. Также в модальном окне устанавливаются обработчики событий сокрытия модального окна при нажатии на кнопку `ESC` и клика вне модального окна.
Поля класса:
- `private _view: HTMLElement` - элемент подтверждения офрмленного заказа
- `private events: EventEmitter` - наследник `EventEmitter`
- `private hideButton: HTMLButtonElement` - кнопка сокрытия модального окна

Методы:
- `setModalContent(view: HTMLElement)` - устанавливает контент модального окна
- `show()` - открывает модальное окно
- `hide()` - скрывает модальное окно

#### Класс `Confirm`
Класс элемента подтверждения оформленного заказа. Конструктор принимает наследника `EventEmitter` и создает элемент.\
Поля класса:
- `private _view: HTMLElement` - элемент подтверждения офрмленного заказа
- `private description: HTMLElement` - элемент суммы офрмленного заказа
- `private events: EventEmitter` - наследник `EventEmitter`

Методы:
- `setTotal(total: number): void` - устанавливает значение итоговой суммы заказа.

#### Класс `Form<T>`
Базовый класс предназначеный для реализации формы. Конструктор принимает наследника `EventEmitter` и `templateSelector` с помощью которого создается элемент формы и записывайтся в поле `_view`.\
Поля класса:
- `protected _view: HTMLFormElement` - элемент фомры
- `private error: HTMLElement` - элемнет, содержащий текст ошибки формы
- `private submitBtn: HTMLButtonElement` - элемент кнопки типа `submit` в форме
- `protected formValues: T = {} as T` - зачения полей ввода формы
- `private inputEls: NodeListOf<HTMLInputElement>` - список элементов ввода формы
- `protected events: EventEmitter` - наследник класса `EventEmitter`

Методы:
- `setCanSubmit(value: boolean)` - устанвливает значение аттрибута `disabled` кнопки `submitBtn`
- `getInputByName(attrValue: string)` - находит элемент формы по переданному значение аттрибута `name`
- `setFormErrors(text: string)` - устанавливает текст ошибки формы
- `hideFormErrors()` - очищает текст ошибки формы
- `resetFormInputs()` - очищает значения полей вовода формы
- геттер для получения элемента формы

#### Класс ContactsForm
Класс формы контактных данных. Наследуется от базового класса `Form<TOrderContacts>`. Конструтор класса принимает наследник класса `EventEmitter` и селектор шаблона для поиска элемента формы. Консруктор утсанавливает обрабочкики событий на поля ввода формы и кнопку подтверждения формы.
Методы:
- `resetForm()` - сбрасывает значения полей ввода формы

#### Класс OrderForm
Класс формы данных заказа. Наследуется от базового класса `Form<TPaymentInfo>`. Конструтор класса принимает наследник класса `EventEmitter` и селекотр шаблона для поиска элемента формы. Консруктор утсанавливает обрабочкики событий на поля ввода формы и кнопку подтверждения формы.
Методы:
- `resetForm()` - сбрасывает значения полей ввода формы

#### Класс `Cart`
Предназначен для реализации корзины.\
Поля класса:
- `private _view: HTMLElement` - элемент корзины
- `private cartTotal: HTMLElement` - элемент итогвой суммы в корзине
- `private orderBtn: HTMLButtonElement` - элемент кнопки подтверждения корзины
- `private events: EventEmitter` - наслидник класса `EventEmitter`

Методы:
- `setCartContent(cartEls: HTMLElement[])` - обновляет спсок элементов корзины
- `setCartTotal(total: number)` - обновляет итоговую сумму в элементе суммы корзины
- `setCanCreateOrder(value: boolean)` - обновляет аттрибут `disabled` у кнопки подтверждения корзины

#### Класс `ProductView`
Отвечает за отображение карточки товара, задавая в ней: категорию, название, описание, изображение, цену. В конструктор класса передается экземпляр `EventEmitter` для создания события. В конструкотре происходит поиск и схоранение в свойства все варианты верски карточки товаров.\
Свойства:
- `private listProductEl: HTMLElement`- вариант отображения товара в списке
- `private cartProductEl: HTMLElement`- вариант отображения товара в корзине
- `private previewProductEl: HTMLElement`- вариант отображения товара в модальном окне
- `private events: EventEmitter`- наследник класса `EventEmitter`
Методы:
- `private getCategoryClass(category: string)` - назначает соответствующие классы для стилизации товаров в зависимости от их категории.
- `createListElement(product: IProductItem)` - создает вариант отображения элемента в списке и добваляет нобходимые обработчики событий
- `createPreviewElement(product: IProductItem, isInCart: boolean)` - создает вариант отображения элемента в модальном окне и добваляет нобходимые обработчики событий 
- `createChartElement(product: IProductItem, listNum: number)` - создает вариант отображения элемента в корзине и добваляет нобходимые обработчики событий

#### Класс `ProductContainer`
Реализует отображение каталога товаров на главной странице. Конструктор производит поиск элемента на странице и сохранаяет его в свойство `_view`.\
Свойства:
- `private _view: HTMLElement` - элемент каталога

Метод:
- `addProduct(productElement: HTMLElement)` - добавляет карточки на страницу. 
- геттер для получения элемента каталога

#### Класс `UserCart`
Отвечает за отображение кнопки "Корзина" и количества товаров в ней на главном экране. Конструктор принимает экземпляр `EventEmitter` для создания события и сохраняет элемент в свойство `_view`.\
Свойства:
- `private _view: HTMLElement` - элемент корзины
- `private events: EventEmitter` - экземпляр класса `EventEmitter`

Метод:
- `setUserCart(itemsCount: number)` - обновляет количество товаров в корзине;
- геттер для получения элемента корзины

### Слой коммуникации

#### Класс `AppApi`
Экземпляр класса `Api` передается в конструктор и предоставляет методы для взаимодействия с серверной частью сервиса.
Свойства:
- `private _baseApi: IApi` - экземпляр класса Api для реализации запросов на сервер;

Метод:
- `getProducts()` - запрос на получение списка товаров;
- `getProduct(productId: string)` - запрос на получение товара;
- `postOrder(order: ApiOrderRequest)` - отправка данных на сервер;

## Взаимодействие компонентов
Код, отвечающий за связь между представлением и данными, находится в файле `index.ts`, который выступает в роли презентера.\
Взаимодействие осуществляется за счет событий, генерируемых с помощью брокера событий и обработчиков этих событий, описанных в index.ts.\
Сначала в `index.ts` создаются экземпляры всех нужных классов, а затем настраивается обработка событий.

##### *События, которые могут создаваться в системе:*
Для хранения названий событий используется `enum EventNamesEnum`.

*События, происходящие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `OPEN_PRODUCT_MODAL` - открытие модального окна "Карточка товара";
- `ADD_PRODUCT_IN_CART` - добавление товара в корзину;
- `OPEN_CART` - открытие модального окна "Корзина";
- `DELETE_PRODUCT_FROM_CART` - удаление товара из корзины;
- `SUBMIT_CART` -  переход к модальному окну оформления заказа "Оплата";
- `SUBMIT_FORM_ORDER` - сохранение данных в форме с данными об оплате;
- `VALIDATIOM_FORM_ORDER` - сообщает о необходимости валидаации формы оплаты;
- `SUBMIT_FORM_CONTACTS` - сохранение данных в форме с контактными данными;
- `VALIDATIOM_FORM_CONTACTS` - сообщает о необходимости валидаации формы с контактными данными;
- `CLOSE_MODAL` - закрытие модального окна.