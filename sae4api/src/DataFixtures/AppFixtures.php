<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Department;
use App\Entity\Room;
use App\Entity\AcquisitionSystem;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $departmentGC = new Department();
        $departmentGC->setName("Génie Civil");
        $departmentGC->setNbrooms(0);
        $manager->persist($departmentGC);

        // Room F205
        $asGC1 = new AcquisitionSystem();
        $asGC1->setName('ESP-GC001');
        $asGC1->setIsInstalled(1);
        $asGC1->setRoom(null);

        $roomGC1 = new Room();
        $roomGC1->setName('F205');
        $roomGC1->setFloor(2);
        $roomGC1->setAcquisitionSystem($asGC1);
        $roomGC1->setDepartment($departmentGC);
        $manager->persist($roomGC1);

        $asGC1->setRoom($roomGC1);
        $manager->persist($asGC1);



        $department = new Department();
        $department->setName("Informatique");
        $department->setNbrooms(0);
        $manager->persist($department);

        // Room D205
        $as1 = new AcquisitionSystem();
        $as1->setName('ESP-001');
        $as1->setIsInstalled(1);
        $as1->setRoom(null);

        $room1 = new Room();
        $room1->setName('D205');
        $room1->setFloor(2);
        $room1->setAcquisitionSystem($as1);
        $room1->setDepartment($department);
        $room1->setDbname("sae34bdk1eq1");
        $manager->persist($room1);

        $as1->setRoom($room1);
        $manager->persist($as1);

        // Room D206
        $as2 = new AcquisitionSystem();
        $as2->setName('ESP-002');
        $as2->setIsInstalled(1);
        $as2->setRoom(null);

        $room2 = new Room();
        $room2->setName('D206');
        $room2->setFloor(2);
        $room2->setAcquisitionSystem($as2);
        $room2->setDepartment($department);
        $room2->setDbname("sae34bdk1eq2");
        $manager->persist($room2);

        $as2->setRoom($room2);
        $manager->persist($as2);

        // Room D207
        $as3 = new AcquisitionSystem();
        $as3->setName('ESP-003');
        $as3->setIsInstalled(1);
        $as3->setRoom(null);

        $room3 = new Room();
        $room3->setName('D207');
        $room3->setFloor(2);
        $room3->setAcquisitionSystem($as3);
        $room3->setDepartment($department);
        $room3->setDbname("sae34bdk1eq3");
        $manager->persist($room3);

        $as3->setRoom($room3);
        $manager->persist($as3);

        // Room D204
        $as4 = new AcquisitionSystem();
        $as4->setName('ESP-004');
        $as4->setIsInstalled(1);
        $as4->setRoom(null);

        $room4 = new Room();
        $room4->setName('D204');
        $room4->setFloor(2);
        $room4->setAcquisitionSystem($as4);
        $room4->setDepartment($department);
        $room4->setDbname("sae34bdk2eq1");
        $manager->persist($room4);

        $as4->setRoom($room4);
        $manager->persist($as4);

        // Room D203
        $as5 = new AcquisitionSystem();
        $as5->setName('ESP-005');
        $as5->setIsInstalled(1);
        $as5->setRoom(null);

        $room5 = new Room();
        $room5->setName('D203');
        $room5->setFloor(2);
        $room5->setAcquisitionSystem($as5);
        $room5->setDepartment($department);
        $room5->setDbname("sae34bdk2eq2");
        $manager->persist($room5);

        $as5->setRoom($room5);
        $manager->persist($as5);

        // Room D303
        $as6 = new AcquisitionSystem();
        $as6->setName('ESP-006');
        $as6->setIsInstalled(1);
        $as6->setRoom(null);

        $room6 = new Room();
        $room6->setName('D303');
        $room6->setFloor(3);
        $room6->setAcquisitionSystem($as6);
        $room6->setDepartment($department);
        $room6->setDbname("sae34bdk2eq3");
        $manager->persist($room6);

        $as6->setRoom($room6);
        $manager->persist($as6);

        // Room D304
        $as7 = new AcquisitionSystem();
        $as7->setName('ESP-007');
        $as7->setIsInstalled(1);
        $as7->setRoom(null);

        $room7 = new Room();
        $room7->setName('D304');
        $room7->setFloor(3);
        $room7->setAcquisitionSystem($as7);
        $room7->setDepartment($department);
        $room7->setDbname("sae34bdl1eq1");
        $manager->persist($room7);

        $as7->setRoom($room7);
        $manager->persist($as7);

        // Room C101
        $as8 = new AcquisitionSystem();
        $as8->setName('ESP-008');
        $as8->setIsInstalled(1);
        $as8->setRoom(null);

        $room8 = new Room();
        $room8->setName('C101');
        $room8->setFloor(1);
        $room8->setAcquisitionSystem($as8);
        $room8->setDepartment($department);
        $room8->setDbname("sae34bdl1eq2");
        $manager->persist($room8);

        $as8->setRoom($room8);
        $manager->persist($as8);

        // Room D109
        $as9 = new AcquisitionSystem();
        $as9->setName('ESP-009');
        $as9->setIsInstalled(1);
        $as9->setRoom(null);

        $room9 = new Room();
        $room9->setName('D109');
        $room9->setFloor(1);
        $room9->setAcquisitionSystem($as9);
        $room9->setDepartment($department);
        $room9->setDbname("sae34bdl1eq3");
        $manager->persist($room9);

        $as9->setRoom($room9);
        $manager->persist($as9);

        // Room Secrétariat
        $as10 = new AcquisitionSystem();
        $as10->setName('ESP-010');
        $as10->setIsInstalled(1);
        $as10->setRoom(null);

        $room10 = new Room();
        $room10->setName('Secrétariat');
        $room10->setFloor(1);
        $room10->setAcquisitionSystem($as10);
        $room10->setDepartment($department);
        $room10->setDbname("sae34bdl2eq1");
        $manager->persist($room10);

        $as10->setRoom($room10);
        $manager->persist($as10);

        // Room D001
        $as11 = new AcquisitionSystem();
        $as11->setName('ESP-011');
        $as11->setIsInstalled(1);
        $as11->setRoom(null);

        $room11 = new Room();
        $room11->setName('D001');
        $room11->setFloor(0);
        $room11->setAcquisitionSystem($as11);
        $room11->setDepartment($department);
        $room11->setDbname("sae34bdl2eq2");
        $manager->persist($room11);

        $as11->setRoom($room11);
        $manager->persist($as11);

        // Room D002
        $as12 = new AcquisitionSystem();
        $as12->setName('ESP-012');
        $as12->setIsInstalled(1);
        $as12->setRoom(null);

        $room12 = new Room();
        $room12->setName('D002');
        $room12->setFloor(0);
        $room12->setAcquisitionSystem($as12);
        $room12->setDepartment($department);
        $room12->setDbname("sae34bdl2eq3");
        $manager->persist($room12);

        $as12->setRoom($room12);
        $manager->persist($as12);

        // Room D004
        $as13 = new AcquisitionSystem();
        $as13->setName('ESP-013');
        $as13->setIsInstalled(1);
        $as13->setRoom(null);

        $room13 = new Room();
        $room13->setName('D004');
        $room13->setFloor(0);
        $room13->setAcquisitionSystem($as13);
        $room13->setDepartment($department);
        $room13->setDbname("sae34bdm1eq1");
        $manager->persist($room13);

        $as13->setRoom($room13);
        $manager->persist($as13);

        // Room C004
        $as14 = new AcquisitionSystem();
        $as14->setName('ESP-014');
        $as14->setIsInstalled(1);
        $as14->setRoom(null);

        $room14 = new Room();
        $room14->setName('C004');
        $room14->setFloor(0);
        $room14->setAcquisitionSystem($as14);
        $room14->setDepartment($department);
        $room14->setDbname("sae34bdm1eq2");
        $manager->persist($room14);

        $as14->setRoom($room14);
        $manager->persist($as14);

        // Room C007
        $as15 = new AcquisitionSystem();
        $as15->setName('ESP-015');
        $as15->setIsInstalled(1);
        $as15->setRoom(null);

        $room15 = new Room();
        $room15->setName('C007');
        $room15->setFloor(0);
        $room15->setAcquisitionSystem($as15);
        $room15->setDepartment($department);
        $room15->setDbname("sae34bdm1eq3");
        $manager->persist($room15);

        $as15->setRoom($room15);
        $manager->persist($as15);

        // Room D201
        $as16 = new AcquisitionSystem();
        $as16->setName('ESP-016');
        $as16->setIsInstalled(1);
        $as16->setRoom(null);

        $room16 = new Room();
        $room16->setName('D201');
        $room16->setFloor(2);
        $room16->setAcquisitionSystem($as16);
        $room16->setDepartment($department);
        $room16->setDbname("sae34bdm2eq1");
        $manager->persist($room16);

        $as16->setRoom($room16);
        $manager->persist($as16);

        // Room D307
        $as17 = new AcquisitionSystem();
        $as17->setName('ESP-017');
        $as17->setIsInstalled(1);
        $as17->setRoom(null);

        $room17 = new Room();
        $room17->setName('D307');
        $room17->setFloor(3);
        $room17->setAcquisitionSystem($as17);
        $room17->setDepartment($department);
        $room17->setDbname("sae34bdm2eq2");
        $manager->persist($room17);

        $as17->setRoom($room17);
        $manager->persist($as17);

        // Room C005
        $as18 = new AcquisitionSystem();
        $as18->setName('ESP-018');
        $as18->setIsInstalled(1);
        $as18->setRoom(null);

        $room18 = new Room();
        $room18->setName('C005');
        $room18->setFloor(0);
        $room18->setAcquisitionSystem($as18);
        $room18->setDepartment($department);
        $room18->setDbname("sae34bdm2eq3");
        $manager->persist($room18);

        $as18->setRoom($room18);
        $manager->persist($as18);

        $manager->flush();
    }
}
