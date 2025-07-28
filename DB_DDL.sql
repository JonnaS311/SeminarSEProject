-- Tabla Manager
CREATE TABLE Manager (
    ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Tabla Task
CREATE TABLE Task (
    Task_ID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL, 
    Description TEXT,
    Date DATE,
    State VARCHAR(50),
    Priority BOOLEAN,
    Assignee VARCHAR(100),
    Color VARCHAR(20),
    Manager_ID INT,
    FOREIGN KEY (Manager_ID) REFERENCES Manager(ID)
);