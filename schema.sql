CREATE TABLE state (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    hpi_type VARCHAR(100) NOT NULL,
    purchase_type VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    place_name VARCHAR(100) NOT NULL,
    place_id VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    period INTEGER NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE usa (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    hpi_type VARCHAR(100) NOT NULL,
    purchase_type VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    place_name VARCHAR(100) NOT NULL,
    place_id VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    period INTEGER NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE puerto_rico (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    hpi_type VARCHAR(100) NOT NULL,
    purchase_type VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    place_name VARCHAR(100) NOT NULL,
    place_id VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    period INTEGER NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE quarterly_states (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    hpi_type VARCHAR(100) NOT NULL,
    purchase_type VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    place_name VARCHAR(100) NOT NULL,
    place_id VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    period INTEGER NOT NULL,
    price INTEGER NOT NULL
);