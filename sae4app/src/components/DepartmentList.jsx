import {useState, useEffect} from 'react';
import {fetchDepartments} from '../services/departmentService';

import DepartmentItem from './DepartmentItem';
import SearchBar from './SearchBar';
import AlertsList from './AlertsList';
import Spinner from './Spinner';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [roomSearch, setRoomSeach] = useState("");

    useEffect(() => {
        async function fetchDepartmentsData() {
            const departmentsData = await fetchDepartments();
            setDepartments(departmentsData);
            setIsLoading(false);
        }

        fetchDepartmentsData();
    }, []);

    const handleSearch = (value) => {
        setRoomSeach(value);
    };

    return (
        <div className="department-list">
            <AlertsList departementId={3}/>

            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
                departments.map((departmentData, index) => (
                    <DepartmentItem key={index} department={departmentData} roomSearch={roomSearch}/>
                ))
            )}
            <SearchBar onSearch={handleSearch} />
        </div>
    );
}

export default DepartmentList;