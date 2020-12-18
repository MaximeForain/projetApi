DROP TABLE IF EXISTS customer CASCADE;

CREATE TABLE customer (
    customer_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar NOT NULL UNIQUE,
    password varchar NOT NULL,
    userName varchar NOT NULL,
    phoneNumber integer UNIQUE,
    birthDate date,
    gender char
);

INSERT INTO customer (email, password, userName, phoneNumber, birthDate, gender)
VALUES ('user1@mail.com', '$2b$10$Xjgy9Y4XYz3C9f24QudnZu/cwn0j0JkRHiHP7EfmTIXiO11/R/YOy', 'John', '0478458945', to_date('05 Dec 1995', 'DD Mon YYYY'), 'H');
INSERT INTO customer (email, password, userName, phoneNumber, birthDate, gender)
VALUES ('user2@mail.com', '$2b$10$ccYQ70Ug6sS0p.Kw68lBoe2EU/NXOoqT8UjY1ZocJcBWfxN6yvJLC', 'Billy', '0475577557', to_date('11 Nov 1995', 'DD Mon YYYY'), 'H');
INSERT INTO customer (email, password, userName, phoneNumber, birthDate, gender)
VALUES ('user3@mail.com', '$2b$10$V1glO097MDH1mf7E6/69a.hWOxJ3AQ2N.Bjfu/.KQjjW/1xVy58tq', 'Julie', '0475131197', to_date('13 Nov 1997', 'DD Mon YYYY'), 'F');



DROP TABLE IF EXISTS administrator CASCADE;

CREATE TABLE administrator (
    admin_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    password varchar NOT NULL,
    numTVA varchar NOT NULL UNIQUE,
    emailProfessional varchar NOT NULL UNIQUE
);

INSERT INTO administrator (password, numTVA, emailProfessional)
VALUES ('$2b$10$2wN0.KiSuHvBHwaUu7jo4etLyWwphf8uVTDii.t4MPcYX9hPFDiwy', '2041009460', 'admin1@mail.com');
INSERT INTO administrator (password, numTVA, emailProfessional)
VALUES ('$2b$10$cCnFVt4vrQ3cU163Cxcq9O9qPbRWbD6Z.DoipAjxouakZzhL9VF9u', '4741048560', 'admin2@mail.com');



DROP TABLE IF EXISTS bar CASCADE;

CREATE TABLE bar (
    bar_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    barName varchar NOT NULL,
    description varchar,
    phoneNumber varchar UNIQUE,
    hashtags varchar,
    webAddress varchar NOT NULL,
    address varchar NOT NULL,
    admin_id integer NOT NULL,
    CONSTRAINT adminFK FOREIGN KEY(admin_id) REFERENCES administrator(admin_id) ON DELETE CASCADE
);

INSERT INTO bar (barName,description,phoneNumber,hashtags,webAddress,address,admin_id)
VALUES ('BARNABEER',
        'Un bar où vous pourriez bien passer des heures, car oui chez nous vous ne serez jamais déçu.',
        '081505478',
        '#cool#styler#beer#cocktails',
        'www.barnabeer.be',
        'Barnabeer 39, Rue de Bruxelles - Namur',
        1);
INSERT INTO bar (barName, description,phoneNumber,hashtags,webAddress,address,admin_id)
VALUES ('PIANOBAR',
        'De ce bar, vous n''en resortirez plus car ici on a la meilleure biere qu''il soit.',
        '081560479',
        '#cool#styler#beer#cocktails',
        'www.PianoBar.be',
        'PianoBar 17, Place Marché aux Légumes - Namur',
        1);
INSERT INTO bar (barName, description,phoneNumber,hashtags,webAddress,address,admin_id)
VALUES ('ANTIQUAIRE',
        'Ici nous nous engagons à vous servire sans fin.',
        '081560475',
        '#beer#fun#friend#love',
        'www.antiquaire.be',
        'Antiquaire 13, Place Maurice Servais - Namur',
        2);



DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorites (
    customer_id integer NOT NULL,
    favoriteBar_id integer NOT NULL,
    PRIMARY KEY (customer_id, favoriteBar_id),
    CONSTRAINT favoriteBarFK FOREIGN KEY(favoriteBar_id) REFERENCES bar(bar_id) ON DELETE CASCADE,
    CONSTRAINT customerFK FOREIGN KEY(customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

INSERT INTO favorites (customer_id, favoriteBar_id) VALUES (1,1);



DROP TABLE IF EXISTS review CASCADE;

CREATE TABLE review (
    reviewID integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    reviewDegree integer,
    customer_id integer NOT NULL,
    bar_id integer NOT NULL,
    CONSTRAINT customerFK FOREIGN KEY(customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    CONSTRAINT barFK FOREIGN KEY(bar_id) REFERENCES bar(bar_id) ON DELETE CASCADE
);

INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('4', 1, 1);
INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('5', 2, 1);
INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('4', 3, 1);

INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('2', 1, 2);
INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('3', 2, 2);
INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('2', 3, 2);

INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('2', 1, 3);
INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('5', 2, 3);
INSERT INTO review (reviewDegree, customer_id, bar_id) VALUES ('2', 3, 3);


DROP TABLE IF EXISTS atmosphere CASCADE;

CREATE TABLE atmosphere (
    atmosphere_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    atmosphereName varchar NOT NULL
);

INSERT INTO atmosphere (atmosphereName) VALUES ('paisible');
INSERT INTO atmosphere (atmosphereName) VALUES ('chaleureux');


DROP TABLE IF EXISTS definition CASCADE;

CREATE TABLE definition (
    bar_id integer NOT NULL,
    atmosphere_id integer NOT NULL,
    PRIMARY KEY (bar_id, atmosphere_id),
    CONSTRAINT barFK FOREIGN KEY(bar_id) REFERENCES bar(bar_id) ON DELETE CASCADE,
    CONSTRAINT atmosphereFK FOREIGN KEY(atmosphere_id) REFERENCES atmosphere(atmosphere_id)
);

INSERT INTO definition (bar_id, atmosphere_id) VALUES (1,1);
INSERT INTO definition (bar_id, atmosphere_id) VALUES (1,2);


DROP TABLE IF EXISTS menu CASCADE;

CREATE TABLE menu (
    menu_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    menuName varchar NOT NULL,
    isOnDisplay BOOLEAN NOT NULL,
    happyHourStartTime TIME,
    happyHourEndTime TIME,
    bar_id integer NOT NULL,
    CONSTRAINT barFK FOREIGN KEY(bar_id) REFERENCES bar(bar_id) ON DELETE CASCADE
);

INSERT INTO menu (menuName, isOnDisplay, happyHourStartTime, happyHourEndTime, bar_id)
VALUES ('Carte de la maison', true, '18:00', '19:00', 1);



DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
    category_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryName varchar NOT NULL,
    menu_id integer NOT NULL,
    CONSTRAINT menuFK FOREIGN KEY(menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);

INSERT INTO category (categoryName,menu_id) VALUES ('Beer', 1);
INSERT INTO category (categoryName,menu_id) VALUES ('Soft', 1);
INSERT INTO category (categoryName,menu_id) VALUES ('Alcools', 1);



DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
    product_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    productName varchar NOT NULL,
    nbCL integer,
    alcoholVolume integer,
    price float,
    description varchar,
    category_id integer NOT NULL,
    CONSTRAINT categoryFK FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO product (productName, nbCL, alcoholVolume, price, description, category_id) VALUES ('Galipette', 33, 6.5, 4.70, 'Blond', 1);
INSERT INTO product (productName, nbCL, alcoholVolume, price, description, category_id) VALUES ('Galipette Triple', 33, 8.8, 5.22, 'Blond', 1);
INSERT INTO product (productName, nbCL, alcoholVolume, price, description, category_id) VALUES ('Gengoulf', 33, 6.1, 4.90, 'Blond', 1);

INSERT INTO product (productName, nbCL, price, category_id) VALUES ('Ritchie cola', 25, 3.50, 2);
INSERT INTO product (productName, nbCL, price, category_id) VALUES ('Spa reine', 33, 2.00, 2);
INSERT INTO product (productName, nbCL, price, category_id) VALUES ('Jus de pomme de la Vallée mosane', 25, 3.50, 2);
INSERT INTO product (productName, nbCL, price, category_id) VALUES ('Limonaide fruit de la passion', 33, 3.50, 2);
INSERT INTO product (productName, nbCL, price, category_id) VALUES ('Schueppes', 33, 3.00, 2);
INSERT INTO product (productName, nbCL, price, category_id) VALUES ('Coca Cola', 25, 2.50, 2);

INSERT INTO product (productName,  nbCL, alcoholVolume, price, description, category_id) VALUES ('Chartreuse verte', 33, 6.5, 5.00, 'fort', 3);
INSERT INTO product (productName,  nbCL, alcoholVolume, price, description, category_id) VALUES ('Whisky Connemara', 33, 8.8, 8.00, 'sec', 3);
INSERT INTO product (productName,  nbCL, alcoholVolume, price, description, category_id) VALUES  ('Rhum Santa Teresa', 33, 6.1, 8.00, 'Anbré', 3);



DROP TABLE IF EXISTS promotion CASCADE;

CREATE TABLE promotion (
    promoPrice float,
    isHappyHour BOOLEAN NOT NULL,
    startDate DATE,
    endDate DATE,
    startTime TIME,
    endTime TIME,
    desciption varchar,
    product_id integer NOT NULL,
    PRIMARY KEY (product_id),
    CONSTRAINT productFK FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

INSERT INTO promotion (promoPrice, isHappyHour, startDate, endDate, startTime, endTime, desciption, product_id)
VALUES (3.70, TRUE, to_date('21 Nov 2020', 'DD Mon YYYY'), null, null, null, 'Happy hour sur la Galipette !', 1);


