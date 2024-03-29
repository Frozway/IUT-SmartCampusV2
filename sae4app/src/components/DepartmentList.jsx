import {useState, useEffect} from 'react';
import {fetchDepartments} from '../services/departmentService';

import DepartmentItem from './DepartmentItem';
import SearchBar from './SearchBar';

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
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-3xl font-bold text-center">⌛Chargement des départements...⌛</p>
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