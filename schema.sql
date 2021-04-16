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

CREATE TABLE state_percent_increase (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    place_name VARCHAR(100) NOT NULL,
    place_id VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    period1 INTEGER NOT NULL,
    price1 INTEGER NOT NULL,
    period4 INTEGER NOT NULL,
    price4 INTEGER NOT NULL,
    yearly_change INTEGER NOT NULL
);