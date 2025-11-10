import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailTask() {
    const { id, taskId } = useParams();
    console.log(id, taskId);

    // const [task, setTask] = useState({});

    useEffect(() => {
        console.log('aaa');
    }, []);

    return (
        <div>
            <h1>hhhh</h1>
        </div>
    );
}

export default DetailTask;
