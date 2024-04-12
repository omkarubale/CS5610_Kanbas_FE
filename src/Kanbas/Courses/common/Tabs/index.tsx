import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ITabs } from "../../../store/interfaces/tabs";
import "./index.css";

const CustomTabs = ({ tabs }: { tabs: ITabs[] }) => {
    const [key, setKey] = useState<string>(tabs[0].eventKey)

    return (
        <Tabs
            className="wd-tabs mb-3"
            activeKey={key}
            onSelect={(k) => setKey(k as string)}
        >
            {tabs.map(tab => (
                <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
                    {key === tab.eventKey && tab.component}
                </Tab>
            ))}
        </Tabs>
    );
};

export default CustomTabs; 