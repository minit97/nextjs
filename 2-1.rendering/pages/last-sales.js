import {useEffect, useState} from "react";
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const LastSalesPage = (props) => {
    const [sales, setSales] = useState();
    // const [isLoading, setIsLoading] = useState(false);

    const {data, error} = useSWR('https://nextjs-course-c0e88-default-rtdb.firebaseio.com/sales.json');
    useEffect(()=>{
        if(data){
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id:key,
                    username: data[key].username,
                    volume:data[key].volume
                });
            }
            setSales(transformedSales);
        }
    },[data]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch(
    //         'URL'
    //     ).then(response => response.json())
    //         .then(data => {
    //             const transformedSales = [];
    //
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id:key,
    //                     username: data[key].username,
    //                     volume:data[key].volume
    //                 });
    //             }
    //
    //             setSales(transformedSales);
    //             setIsLoading(false);
    //         });
    // }, []);

    if(error){
        return <p>Failed to load.</p>;
    }

    if(!data || !sales) {
        return <p>Loading...</p>;
    }

    if(!sales){
        return <p>No data yet</p>;
    }

    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
        </ul>
    );
}

export default LastSalesPage;