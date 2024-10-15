USE Hospital;

-- insertion




INSERT INTO User
    (Username, Password, Type, Name, Email)
VALUES
    ('doc1', 'pass', 'doctor', 'John Doe', 'juststartedxd150@gmail.com'),
    ('doc2', 'pass', 'doctor', 'Jane Smith', 'juststartedxd150@gmail.com'),
    ('dataentry1', 'pass', 'dataentry', 'Emily Johnson', 'juststartedxd150@gmail.com'),
    ('dataentry2', 'pass', 'dataentry', 'Michael Lee', 'juststartedxd150@gmail.com'),
    ('admin1', 'pass', 'admin', 'David Brown', 'juststartedxd150@gmail.com'),
    ('admin2', 'pass', 'admin', 'Amanda Wilson', 'juststartedxd150@gmail.com'),
    ('frontdesk1', 'pass', 'frontdesk', 'Sarah Taylor', 'juststartedxd150@gmail.com'),
    ('frontdesk2', 'pass', 'frontdesk', 'Kevin Martinez', 'juststartedxd150@gmail.com'),
    ('doc3', 'pass', 'doctor', 'William Davis', 'juststartedxd150@gmail.com'),
    ('doc4', 'pass', 'doctor', 'Olivia Hernandez', 'juststartedxd150@gmail.com'),
    ('dataentry3', 'pass', 'dataentry', 'Ethan Garcia', 'juststartedxd150@gmail.com'),
    ('dataentry4', 'pass', 'dataentry', 'Sophia Martinez', 'juststartedxd150@gmail.com'),
    ('admin3', 'pass', 'admin', 'Aiden Jackson', 'juststartedxd150@gmail.com'),
    ('admin4', 'pass', 'admin', 'Madison Miller', 'juststartedxd150@gmail.com'),
    ('frontdesk3', 'pass', 'frontdesk', 'Daniel Moore', 'juststartedxd150@gmail.com'),
    ('frontdesk4', 'pass', 'frontdesk', 'Avery Davis', 'juststartedxd150@gmail.com'),
    ('doc5', 'pass', 'doctor', 'Chloe Green', 'juststartedxd150@gmail.com'),
    ('doc6', 'pass', 'doctor', 'Alexander Scott', 'juststartedxd150@gmail.com'),
    ('dataentry5', 'pass', 'dataentry', 'Natalie Carter', 'juststartedxd150@gmail.com'),
    ('dataentry6', 'pass', 'dataentry', 'Noah Young', 'juststartedxd150@gmail.com');


INSERT INTO Room
    (Number, Type, Beds_avail)
VALUES
    (101, 'General', 10),
    (102, 'General', 5),
    (103, 'General', 5),
    (104, 'General', 5),
    (105, 'General', 4),
    (106, 'General', 5),
    (107, 'General', 5),
    (108, 'General', 6),
    (109, 'General', 5),
    (110, 'General', 4),
    (201, 'Cabin', 1),
    (202, 'Cabin', 1),
    (203, 'HDU', 3),
    (204, 'Cabin', 2),
    (205, 'HDU', 2),
    (206, 'Cabin', 2),
    (207, 'HDU', 2),
    (208, 'Cabin', 2),
    (209, 'Cabin', 2),
    (210, 'Cabin', 2),
    (301, 'HDU', 2),
    (302, 'HDU', 1),
    (303, 'HDU', 1),
    (304, 'ICU', 1),
    (305, 'ICU', 1);



INSERT INTO Test
    (Name, Date, Result)
VALUES
    ('Blood Test', '2022-01-01 10:30:00', 'Positive'),
    ('X-Ray', '2022-01-02 14:00:00', 'Negative'),
    ('CT Scan', '2022-01-03 09:15:00', 'Positive'),
    ('MRI', '2022-01-05 11:00:00', 'Negative'),
    ('ECG', '2022-01-07 16:45:00', 'Positive'),
    ('Ultrasound', '2022-01-10 10:00:00', 'Negative'),
    ('Blood Culture', '2022-01-11 11:30:00', NULL),
    ('Urine Culture', '2022-01-12 12:15:00', NULL),
    ('Stool Test', NULL, NULL),
    ('Sputum Test', NULL, NULL);

INSERT INTO Treatment
    (Date, Name, Dosage)
VALUES
    ('2022-01-01 09:00:00', 'Antibiotic', '500mg, 2 times a day'),
    ('2022-01-02 12:00:00', 'Painkiller', '100mg, as needed'),
    ('2022-01-03 14:30:00', 'Antacid', '1 tablet, 3 times a day'),
    ('2022-01-04 16:00:00', 'Steroid', '10mg, once a day'),
    ('2022-01-05 10:00:00', 'Anti-inflammatory', '200mg, 2 times a day'),
    ('2022-01-06 11:30:00', 'Antifungal', '250mg, 2 times a day'),
    ('2022-01-07 08:15:00', 'Anticoagulant', '15mg, once a day'),
    ('2022-01-08 13:45:00', 'Insulin', '10 units, before meals'),
    ('2022-01-09 09:30:00', 'Beta blocker', '25mg, once a day'),
    ('2022-01-10 11:00:00', 'Diuretic', '20mg, once a day');

-- select * from Treatment;

INSERT INTO Patient
    (ID, Name, Address, contact, email)
VALUES
    (100, 'John Smith', '123 Main St', '555-555-1234', 'johnsmith@email.com'),
    (101, 'Emily Jones', '456 Elm St', '555-555-5678', 'emilyjones@email.com'),
    (102, 'William Johnson', '789 Oak St', '555-555-9012', 'williamjohnson@email.com'),
    (103, 'Sophia Lee', '321 Pine St', '555-555-3456', 'sophialee@email.com'),
    (104, 'Aiden Brown', '654 Maple St', '555-555-7890', 'aidenbrown@email.com'),
    (105, 'Mia Davis', '987 Birch St', '555-555-1234', 'miadavis@email.com'),
    (106, 'Lucas Clark', '147 Cherry St', '555-555-5678', 'lucasclark@email.com'),
    (107, 'Olivia Wilson', '258 Cedar St', '555-555-9012', 'oliviawilson@email.com'),
    (108, 'Caleb Allen', '369 Ash St', '555-555-3456', 'caleballen@email.com'),
    (109, 'Charlotte Taylor', '951 Walnut St', '555-555-7890', 'charlottetaylor@email.com'),
    (110, 'Ethan Martin', '753 Spruce St', '555-555-1234', 'ethanmartin@email.com'),
    (111, 'Avery Anderson', '864 Pineapple St', '555-555-5678', 'averyanderson@email.com'),
    (112, 'Mason Scott', '975 Watermelon St', '555-555-9012', 'masonscott@email.com'),
    (113, 'Lily Baker', '753 Banana St', '555-555-3456', 'lilybaker@email.com'),
    (114, 'Alexander Green', '864 Orange St', '555-555-7890', 'alexandergreen@email.com'),
    (115, 'Isabella Adams', '975 Grape St', '555-555-1234', 'isabellaadams@email.com'),
    (116, 'Benjamin Lewis', '753 Lemon St', '555-555-5678', 'benjaminlewis@email.com'),
    (117, 'Chloe Turner', '864 Lime St', '555-555-9012', 'chloeturner@email.com'),
    (118, 'Daniel Hall', '975 Peach St', '555-555-3456', 'danielhall@email.com'),
    (119, 'Grace Collins', '753 Pear St', '555-555-7890', 'gracecollins@email.com'),
    (120, 'Liam Parker', '864 Apple St', '555-555-1234', 'liamparker@email.com'),
    (121, 'Emma Phillips', '975 Orange St', '555-555-5678', 'emmphillips@email.com'),
    (122, 'Noah Campbell', '753 Pine St', '555-555-9012', 'noahcampbell@email.com'),
    (123, 'Ava Edwards', '864 Elm St', '555-555-3456', 'avaedwards@email.com'),
    (124, 'Logan Ross', '975 Oak St', '555-555-7890', 'loganross@email.com');

INSERT INTO Patient
    (ID, Name, Address, Contact, Email)
VALUES
    (125, 'Aria Bailey', '753 Maple St', '555-555-5678', 'ariabailey@email.com'),
    (126, 'Jameson Cooper', '864 Birch St', '555-555-9012', 'jamesoncooper@email.com'),
    (127, 'Harper Murphy', '975 Pine St', '555-555-3456', 'harpermurphy@email.com'),
    (128, 'Elijah Richardson', '753 Elm St', '555-555-7890', 'elijahrichardson@email.com'),
    (129, 'Madison Perez', '864 Oak St', '555-555-1234', 'madisonperez@email.com'),
    (130, 'Carter Turner', '975 Cedar St', '555-555-5678', 'carterturner@email.com'),
    (131, 'Elizabeth Rogers', '753 Ash St', '555-555-9012', 'elizabethrogers@email.com'),
    (132, 'William Foster', '864 Walnut St', '555-555-3456', 'williamfoster@email.com'),
    (133, 'Ella Foster', '975 Spruce St', '555-555-7890', 'ellafoster@email.com'),
    (134, 'Gabriel Hayes', '753 Pineapple St', '555-555-1234', 'gabrielhayes@email.com'),
    (135, 'Scarlett Bennett', '864 Watermelon St', '555-555-5678', 'scarlettbennett@email.com'),
    (136, 'Owen Long', '975 Banana St', '555-555-9012', 'owenlong@email.com'),
    (137, 'Mila Flores', '753 Orange St', '555-555-3456', 'milaflores@email.com'),
    (138, 'Levi Wood', '864 Grape St', '555-555-7890', 'leviwood@email.com'),
    (139, 'Hazel Ramirez', '975 Lemon St', '555-555-1234', 'hazelramirez@email.com');



INSERT INTO Prescription
    (ID)
VALUES
    (1000),
    (1001),
    (1002),
    (1003),
    (1004),
    (1005),
    (1006),
    (1007),
    (1008),
    (1009),
    (1010),
    (1011),
    (1012),
    (1013),
    (1014),
    (1015),
    (1016),
    (1017),
    (1018),
    (1019);


INSERT INTO Prescription_Test
    (ID, Test, Important)
VALUES
    (1001, 1, 1),
    (1002, 2, 0),
    (1003, 3, 0),
    (1004, 5, 1),
    (1005, 6, 0),
    (1006, 7, 1),
    (1007, 8, 1),
    (1008, 9, 0),
    (1009, 10, 0);


INSERT INTO Prescription_Treatment
    (ID, Treatment)
VALUES
    (1001, 2),
    (1000, 6),
    (1001, 4),
    (1000, 8),
    (1002, 1),
    (1003, 9),
    (1004, 3),
    (1005, 7),
    (1006, 5),
    (1007, 10);


INSERT INTO Appointment
    (ID, Prescription, Priority, Patient, Doctor, Date)
VALUES
    (1, NULL, 8, 101, 'doc1', '2023-01-10'),
    (2, NULL, 4, 102, 'doc2', '2023-02-01'),
    (3, NULL, 2, 103, 'doc1', '2023-04-15'),
    (4, NULL, 6, 104, 'doc2', '2023-04-20'),
    (5, NULL, 10, 105, 'doc1', '2023-04-05'),
    (6, NULL, 3, 106, 'doc2', '2023-03-10'),
    (7, NULL, 9, 107, 'doc1', '2023-04-12'),
    (8, NULL, 1, 108, 'doc2', '2023-05-17'),
    (9, NULL, 7, 109, 'doc1', '2023-06-25'),
    (10, NULL, 5, 110, 'doc2', '2023-04-30'),
    (11, NULL, 4, 111, 'doc1', '2023-05-12'),
    (12, NULL, 2, 112, 'doc2', '2023-06-20'),
    (13, NULL, 6, 113, 'doc1', '2023-04-22'),
    (14, NULL, 10, 114, 'doc2', '2023-05-15'),
    (15, NULL, 3, 115, 'doc1', '2023-06-08'),
    (16, NULL, 8, 116, 'doc2', '2023-04-25'),
    (17, NULL, 1, 117, 'doc1', '2023-05-03'),
    (18, NULL, 9, 118, 'doc2', '2023-06-18'),
    (19, NULL, 5, 119, 'doc1', '2023-04-27'),
    (20, NULL, 2, 120, 'doc2', '2023-05-22'),
    (21, NULL, 6, 121, 'doc1', '2023-06-13'),
    (22, NULL, 10, 122, 'doc2', '2023-04-18'),
    (23, NULL, 3, 123, 'doc1', '2023-05-08'),
    (24, NULL, 8, 124, 'doc2', '2023-06-29'),
    (25, NULL, 1, 125, 'doc1', '2023-04-14'),
    (26, NULL, 9, 126, 'doc2', '2023-05-27'),
    (27, NULL, 5, 127, 'doc1', '2023-06-01'),
    (28, NULL, 2, 128, 'doc2', '2023-04-24'),
    (29, NULL, 6, 129, 'doc1', '2023-05-19'),
    (30, NULL, 10, 130, 'doc2', '2023-06-22'),
    (31, NULL, 3, 131, 'doc1', '2023-04-16');

INSERT INTO Appointment
    (`ID`, `Prescription`, `Priority`, `Patient`, `Doctor`, `Date`) VALUES
(51, 1001, 3, 101, 'doc1', '2022-12-15'),
(52, 1002, 2, 104, 'doc1', '2022-12-10'),
(53, 1003, 6, 105, 'doc2', '2022-11-22'),
(54, 1004, 9, 106, 'doc2', '2022-11-18'),
(55, 1005, 8, 107, 'doc1', '2022-10-30'),
(56, 1006, 5, 108, 'doc1', '2022-10-15'),
(57, 1007, 1, 109, 'doc2', '2022-09-28'),
(58, 1008, 4, 105, 'doc2', '2022-09-25'),
(59, 1009, 7, 101, 'doc1', '2022-08-31'),
(60, 1010, 10, 102, 'doc1', '2022-08-15');

INSERT INTO Admission
    (Patient, Room, Admit_date, Discharge_date)
VALUES
    (100, 101, '2022-01-01', '2022-01-05'),
    (101, 102, '2022-01-03', '2022-01-06'),
    (102, 103, '2022-01-05', null),
    (103, 104, '2022-01-07', '2022-01-10'),
    (104, 105, '2022-01-09', null),
    (105, 106, '2022-01-11', '2022-01-15'),
    (106, 107, '2022-01-13', '2022-01-16'),
    (107, 108, '2023-01-15', null),
    (108, 109, '2023-01-17', '2023-01-20'),
    (109, 110, '2023-01-19', '2023-01-23'),
    (110, 201, '2023-01-21', null),
    (111, 201, '2023-01-23', null),
    (112, 202, '2023-01-25', '2023-01-28'),
    (113, 203, '2023-01-27', null),
    (114, 205, '2023-01-29', '2023-02-01'),
    (115, 206, '2023-01-31', null),
    (116, 207, '2023-02-02', '2023-02-05'),
    (117, 205, '2023-02-04', null),
    (118, 208, '2023-02-06', '2023-02-09'),
    (119, 209, '2023-02-08', null);





