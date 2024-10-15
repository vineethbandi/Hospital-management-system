select Appointment.ID AS appID,
    Treatment.ID AS treatmentID,
    Treatment.Name AS treatmentName,
    Treatment.Dosage AS Dosage,
    Treatment.Date AS Date
from Treatment, Prescription_Treatment, Appointment
where Appointment.Patient = 103 and Appointment.Prescription = Prescription_Treatment.ID and Prescription_Treatment.Treatment = Treatment.ID;



SELECT Patient.*,
    CASE WHEN Admission.ID IS NOT NULL AND Admission.Discharge_date IS NULL
            THEN true
            ELSE false
          END AS admitted
FROM Patient
    LEFT JOIN Admission ON Patient.ID = Admission.Patient
ORDER BY Patient.ID DESC;



Select Admission.ID AS ID, Admission.Room
from Admission
WHERE Admission.Patient = 139 AND Admission.Discharge_date IS NULL;



SELECT Patient.*, Admission.Room AS Room, Room.Type AS Type,
    CASE WHEN Admission.ID IS NOT NULL AND Admission.Discharge_date IS NULL
            THEN true
            ELSE false
          END AS admitted
FROM Patient
    LEFT JOIN Admission ON Patient.ID = Admission.Patient AND Admission.Discharge_date IS NULL
    LEFT JOIN Room ON Room.Number = Admission.Room
ORDER BY Patient.ID DESC;




SELECT Admission.ID AS appID, Admission.Room AS Room, Admission.Admit_date As Admit_date, Admission.Discharge_date AS Discharge_Date,
    Patient.Name AS Name, Patient.ID AS Patient
FROM Admission
    JOIN Patient ON Admission.Patient = Patient.ID
ORDER BY Admission.ID DESC
LIMIT 100;


SELECT Patient.*, Appointment.Date AS aapDate, Appointment.ID AS appID
      FROM Patient, Appointment
      WHERE Patient.ID = Appointment.Patient AND CURDATE() > Appointment.Date AND Appointment.Prescription IS NULL;


UPDATE Appointment SET Date='2023-03-12', Priority=2 WHERE ID = '1';

SELECT Patient.*, Test.ID AS testID, Test.Name AS testName
      FROM Patient, Appointment, Prescription AS P, Prescription_Test AS T, Test
      WHERE Patient.ID = Appointment.Patient AND Appointment.Prescription = P.ID AND P.ID = T.ID AND T.Test = Test.ID AND Test.Date IS NULL;



      select * from Test;



SELECT Username
FROM User
    LEFT JOIN Appointment ON User.Username = Appointment.Doctor AND Appointment.Prescription IS NULL AND Appointment.Date >= CURDATE()
WHERE User.Type = 'doctor' AND Active
GROUP BY Username
ORDER BY COUNT(Username)
LIMIT 1;



(select Username
from User where
                User.Active=1 and
                User.Type="doctor" and User.Username not in
(select Doctor
from Appointment
where Date='${fdate}')
limit 1)
                union
(Select Doctor
from Appointment, User
where Appointment.Doctor=User.Username and User.Active=1 and Date='${fdate}'
group by Doctor
order by count(*)
limit 1);




