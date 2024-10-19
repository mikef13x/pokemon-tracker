import { Box, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
    labels: {
        '1 year': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        '6 months': ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        '3 months': ['Oct', 'Nov', 'Dec'],
        '2 weeks': ['Week 1', 'Week 2'],
    },
    datasets: {
        '1 year': [
            { label: 'raw', data: [65, 70, 75, 70, 80, 85, 90, 85, 95, 100, 105, 100], fill: false, backgroundColor: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)' },
            { label: 'PSA 10', data: [110, 115, 120, 115, 125, 130, 135, 130, 140, 145, 150, 145], fill: false, backgroundColor: 'red', borderColor: 'red' },
            { label: 'PSA 9', data: [100, 105, 110, 105, 115, 120, 125, 120, 130, 135, 140, 135], fill: false, backgroundColor: 'blue', borderColor: 'blue' },
            { label: 'PSA 8', data: [90, 95, 100, 95, 105, 110, 115, 110, 120, 125, 130, 125], fill: false, backgroundColor: 'green', borderColor: 'green' },
            { label: 'PSA 7', data: [80, 85, 90, 85, 95, 100, 105, 100, 110, 115, 120, 115], fill: false, backgroundColor: 'purple', borderColor: 'purple' },
        ],
        '6 months': [
            { label: 'raw', data: [90, 85, 95, 100, 105, 100], fill: false, backgroundColor: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)' },
            { label: 'PSA 10', data: [135, 130, 140, 145, 150, 145], fill: false, backgroundColor: 'red', borderColor: 'red' },
            { label: 'PSA 9', data: [125, 120, 130, 135, 140, 135], fill: false, backgroundColor: 'blue', borderColor: 'blue' },
            { label: 'PSA 8', data: [115, 110, 120, 125, 130, 125], fill: false, backgroundColor: 'green', borderColor: 'green' },
            { label: 'PSA 7', data: [105, 100, 110, 115, 120, 115], fill: false, backgroundColor: 'purple', borderColor: 'purple' },
        ],
        '3 months': [
            { label: 'raw', data: [95, 100, 105], fill: false, backgroundColor: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)' },
            { label: 'PSA 10', data: [140, 145, 150], fill: false, backgroundColor: 'red', borderColor: 'red' },
            { label: 'PSA 9', data: [130, 135, 140], fill: false, backgroundColor: 'blue', borderColor: 'blue' },
            { label: 'PSA 8', data: [120, 125, 130], fill: false, backgroundColor: 'green', borderColor: 'green' },
            { label: 'PSA 7', data: [110, 115, 120], fill: false, backgroundColor: 'purple', borderColor: 'purple' },
        ],
        '2 weeks': [
            { label: 'raw', data: [100, 105], fill: false, backgroundColor: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)' },
            { label: 'PSA 10', data: [145, 150], fill: false, backgroundColor: 'red', borderColor: 'red' },
            { label: 'PSA 9', data: [135, 140], fill: false, backgroundColor: 'blue', borderColor: 'blue' },
            { label: 'PSA 8', data: [125, 130], fill: false, backgroundColor: 'green', borderColor: 'green' },
            { label: 'PSA 7', data: [115, 120], fill: false, backgroundColor: 'purple', borderColor: 'purple' },
        ],
    },
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true, // Show the legend
        },
        title: {
            display: true,
            text: 'Price Trend',
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(context.parsed.y);
                    }
                    return label;
                },
            },
        },
    },
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(value);
                },
            },
        },
    },
};

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 224,
            width: 250,
        },
    },
};

export default function MarketChart() {
    const [selectedDatasets, setSelectedDatasets] = useState([data.datasets['1 year'][0]]);
    const [selectedTimeline, setSelectedTimeline] = useState('1 year');

    const handleDatasetChange = (event) => {
        const selectedLabels = event.target.value;
        const datasets = selectedLabels.map(label => data.datasets[selectedTimeline].find(ds => ds.label === label));
        setSelectedDatasets(datasets);
    };

    const handleTimelineChange = (event) => {
        const selectedTimeline = event.target.value;
        setSelectedTimeline(selectedTimeline);
    };

    return (
        <>
            <Box sx={{
                width: '65%',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                border: '4px solid black',
                marginLeft: '50px',
                height: '80%'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '16px' }}>
                    <FormControl sx={{ width: '200px' }}>
                        <InputLabel id="timeline-select-label">Timeline</InputLabel>
                        <Select
                            labelId="timeline-select-label"
                            id="timeline-select"
                            value={selectedTimeline}
                            label="Timeline"
                            onChange={handleTimelineChange}
                        >
                            {Object.keys(data.labels).map((timeline) => (
                                <MenuItem key={timeline} value={timeline}>
                                    {timeline}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '200px' }}>
                        <InputLabel id="dataset-select-label">Card Type</InputLabel>
                        <Select
                            labelId="dataset-select-label"
                            id="dataset-select"
                            multiple
                            value={selectedDatasets.map(ds => ds.label)}
                            label="dataset"
                            onChange={handleDatasetChange}
                            renderValue={(selected) => selected.length > 1 ? `${selected.length} selected` : selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {data.datasets[selectedTimeline].map((dataset) => (
                                <MenuItem key={dataset.label} value={dataset.label}>
                                    <Checkbox checked={selectedDatasets.some(ds => ds.label === dataset.label)} />
                                    <ListItemText primary={dataset.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Line data={{ labels: data.labels[selectedTimeline], datasets: selectedDatasets }} options={options} />
            </Box>
        </>
    );
}