import axios from "axios";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";

const API = process.env.REACT_APP_API_URL;

function Resources() {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios.get(API + "/resources")
            .then((response) => {
                console.log(response)
                setResources(response.data.result);
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div classNames = "available-resources">       
                <section className="resource-arr">
                    {resources.map((resource) => {
                        return <SingleResource key = {resource.resource_id} resource={resource} />
                    })}
                </section>     
        </div>
    )

}

export default Resources;