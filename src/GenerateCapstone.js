import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faCopy, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './App.css';

export default function GenerateCapstone() {
    const [data, setData] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // read titles json file
        const fetchData = async () => {
            try {
                const response = await fetch('/titles.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const parsedData = await response.json();
                setData(parsedData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data === null) {
            return;
        }

        // generate random title
        const randomIndex = Math.floor(Math.random() * data.length);
        setTitle(data[randomIndex].title);
        setAuthor(data[randomIndex].author);
    }, [data]);

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="container" id="title-container">
                <p id="title">{title}</p>
                <p id="author">-{author}</p>
                <FontAwesomeIcon icon={faCopy} onClick={() => {
                    navigator.clipboard.writeText(`${title} \n-${author}`);
                    toast.success('Successfully Copied!')
                }} />
            </div>
            <button
                id="generate-button"
                onClick={() => {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setTitle(data[randomIndex].title);
                    setAuthor(data[randomIndex].author);

                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                    }, 300);

                }}
            >
                {loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                    <>
                        <FontAwesomeIcon icon={faRetweet} />
                        Generate
                    </>
                )}
            </button>
        </>
    )
}