USE Hospital;

create table User (
    `Username` varchar(256) primary key,
    `Password` text not null,
    `Type` varchar(16) not null,
    `Name` varchar(256) not null,
    `Email` varchar(256),
    `Active` boolean default true not null,
    CHECK (`Type` IN ('frontdesk','admin','dataentry', 'doctor'))
);

create table Room (
    `Number` int primary key,
    `Type` text not null,
    `Beds_avail` int not null
);

create table Test (
    `ID` int primary key auto_increment,
    `Name` text not null,
    `Date` datetime,
    `Result` text,
    `Report` MEDIUMBLOB,
    `Image` MEDIUMBLOB
);

create table Treatment (
    `ID` int primary key auto_increment,
    `Date` datetime not null,
    `Name` text not null,
    `Dosage` text not null
);

create table Patient (
    `ID` int primary key auto_increment,
    `Name` text not null,
    `Address` text not null,
    `Contact` text,
    `Email` text
);

create table Prescription (
    `ID` int primary key auto_increment
);

create table Prescription_Treatment (
    `ID` int,
    `Treatment` int,
    foreign key (`Treatment`) REFERENCES `Treatment`(`ID`),
    foreign key (`ID`) REFERENCES `Prescription` (`ID`),
    primary key (`Treatment`)
);

create table Prescription_Test (
    `ID` int,
    `Test` int,
    `Important` boolean default false not null,
    foreign key (`Test`) REFERENCES `Test`(`ID`),
    foreign key (`ID`) REFERENCES `Prescription`(`ID`),
    primary key (`Test`)
);

create table Admission (
    `ID` int primary key auto_increment,
    `Patient` int,
    `Room` int,
    `Admit_date` datetime not null,
    `Discharge_date` datetime,
    foreign key (`Patient`) REFERENCES `Patient`(`ID`),
    foreign key (`Room`) REFERENCES `Room`(`Number`)
);

create table Appointment (
    `ID` int primary key auto_increment,
    `Prescription` int,
    `Priority` int not null,
    `Patient` int,
    `Doctor` varchar(256),
    `Date` date not null,
    foreign key (`Prescription`) REFERENCES `Prescription`(`ID`),
    foreign key (`Patient`) REFERENCES `Patient`(`ID`),
    foreign key (`Doctor`) REFERENCES `User`(`Username`)
);

create table Patient_Appointment (
    `ID` int,
    `Appointment` int,
    foreign key (`Appointment`) REFERENCES `Appointment`(`ID`),
    primary key (`Appointment`)
);

create table Patient_Admission (
    `ID` int,
    `Admission` int,
    foreign key (`Admission`) REFERENCES `Admission`(`ID`),
    primary key (`Admission`)
);