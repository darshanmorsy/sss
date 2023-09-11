import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';

const HomeScreen = (props) => {
    const [details, setDetails] = useState({
        towersName: "",
        towers: []
    })
    const [towerTitle, setTowerTitle] = useState("")
    const navigate = useNavigate();

    const onChangePage = () => {
        navigate("/welcome")
    }

    const onChangeDetails = (value) => {
        setDetails({ ...details, ...value })
    }

    const onAddTower = () => {
        setDetails({ ...details, towers: [...details.towers, { title: towerTitle }] });
        setTowerTitle("");
    }

    const onChangeTower = (text, item, index, key) => {
        item[key] = text;
        let data = details;
        data.towers[index] = item;
        setDetails({ ...data });
    }
    const onChangeFloor = (text, index, key, i, Floor, ind) => {
        Floor[key] = text;
        let data = details;
        data.towers[index].Building[i].Floors[ind] = Floor;
        setDetails({ ...data });
    }

    const onChangeCustomField = (text, index, key, i, ind, num, Field) => {
        Field[key] = text;
        let data = details;
        data.towers[index].Building[i].Floors[ind].Custom_Fields[num] = Field;
        setDetails({ ...data });
    }

    const onAddBuilding = (item, index, key) => {
        const object = { Building: item.Custom_Building_Name ? item.Custom_Building_Name : "", Floor: item.Floors ? item.Floors : "", Flats: item.Flats ? item.Flats : "" }
        item[key] = [...(item[key] ? item[key] : []), object];
        item["Custom_Building_Name"] = ""
        item["Floors"] = ""
        item["Flats"] = ""
        let data = details;
        data.towers[index] = item;
        setDetails({ ...data });
    }

    const onAddFloors = (index, key, Building, i) => {
        Building[key] = [...(Building[key] ? Building[key] : []), {}];
        let data = details;
        data.towers[index].Building[i] = Building;
        setDetails({ ...data });
    }

    const onAddCustomFields = (index, key, i, Floor, ind) => {
        Floor[key] = [...(Floor[key] ? Floor[key] : []), {}];
        let data = details;
        data.towers[index].Building[i].Floors[ind] = Floor;
        setDetails({ ...data });
    }

    const onSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(details);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://morsyestate.onrender.com/", requestOptions)
            .then(response => response.text())
            .then(result => console.log("result",result))
            .catch(error => console.log('error', error));
    }

    return (
        <div className='main-container'>
            <header className='header'>
                <h1>home</h1>
            </header>
            <div className='container'>
                <div className='form-container'>
                    <h1 className='title'>Advance Details</h1>
                    <Input value={details.towersName} onChange={(text) => onChangeDetails({ towersName: text })} label={"Enter Towers"} placeholder={"Enter Towers"} />
                    <h3 className='form-title'>Building Form</h3>
                    <Input value={towerTitle} onChange={setTowerTitle} label={"Custom Tower Name"} placeholder={"Enter Custom Tower Name"} />
                    <button className='button' onClick={() => onAddTower()}>Add Tower</button>
                    {details.towers.map((tower, index) => (
                        <div key={index} className='tower-form-box'>
                            <h3 className='building-form-title'>{tower.title != "" ? tower.title : `Tower ${index + 1}`}</h3>
                            <Input value={tower.Custom_Building_Name} onChange={(text) => onChangeTower(text, tower, index, "Custom_Building_Name")} label={"Custom Building Name"} placeholder={"Enter custom building name"} />
                            <Input value={tower.Floors} onChange={(text) => onChangeTower(text, tower, index, "Floors")} label={"How Many Floors"} type={"number"} placeholder={"Enter number of floors"} />
                            <Input value={tower.Flats} onChange={(text) => onChangeTower(text, tower, index, "Flats")} label={"How Many Flats"} type={"number"} placeholder={"Enter number of flats"} />
                            <button className='button' onClick={() => onAddBuilding(tower, index, "Building")}>Add Building</button>
                            {tower.Building?.map((Building, i) => (
                                <div key={i} className='tower-form-box'>
                                    <h3 className='building-form-title'>{Building.Building != "" ? Building.Building : `Building ${i + 1}`}</h3>
                                    <h5 className='building-sub-title'>How Many Floors : {Building.Floor != "" ? Building.Floor : 0}</h5>
                                    <h5 className='building-sub-title'>How Many Flats : {Building.Flats != "" ? Building.Flats : 0}</h5>
                                    <button className='button' onClick={() => onAddFloors(index, "Floors", Building, i)}>Add Floors</button>
                                    {Building.Floors?.map((Floor, ind) => (
                                        <div key={ind} className='tower-form-box'>
                                            <h3 className='building-form-title'>{`Floors ${ind + 1} Details`}</h3>
                                            <div className='floor-box'>
                                                <Input value={Floor.Rooms} onChange={(text) => onChangeFloor(text, index, "Rooms", i, Floor, ind)} inputClass={"input Floor-input"} inputBoxClass={"input-box floor-input-box"} label={"Number of Rooms"} type={"select"} placeholder={"Enter number of Rooms"} />
                                                <Input value={Floor.Carpet_Area} onChange={(text) => onChangeFloor(text, index, "Carpet_Area", i, Floor, ind)} inputClass={"input Floor-input"} inputBoxClass={"input-box floor-input-box"} label={"Carpet Area"} type={"number"} placeholder={"Enter Carpet Area"} />
                                                <Input value={Floor.Built_Up_Area} onChange={(text) => onChangeFloor(text, index, "Built_Up_Area", i, Floor, ind)} inputClass={"input Floor-input"} inputBoxClass={"input-box floor-input-box"} label={"Built-Up Area"} type={"number"} placeholder={"Built-Up Area"} />
                                                <Input value={Floor.Super_Built_Up_Area} onChange={(text) => onChangeFloor(text, index, "Super_Built_Up_Area", i, Floor, ind)} inputClass={"input Floor-input"} inputBoxClass={"input-box floor-input-box"} label={"Super Built-Up Area"} type={"number"} placeholder={"Super Built-Up Area"} />
                                                <Input value={Floor.Price} onChange={(text) => onChangeFloor(text, index, "Price", i, Floor, ind)} inputClass={"input Floor-input"} inputBoxClass={"input-box floor-input-box"} label={"Price"} type={"text"} placeholder={"Price"} />
                                            </div>
                                            <button className='button' onClick={() => onAddCustomFields(index, "Custom_Fields", i, Floor, ind)}>Add Custom Fields</button>
                                            {Floor.Custom_Fields?.map((Field, num) => (
                                                <div key={num} className='floor-box'>
                                                    <Input value={Field.Field_1} onChange={(text) => onChangeCustomField(text, index, "Field_1", i, ind, num, Field)} inputClass={"input Floor-input"} inputBoxClass={"input-box custom-field-input-box"} placeholder={"Enter Custom Field 1"} />
                                                    <Input value={Field.Field_2} onChange={(text) => onChangeCustomField(text, index, "Field_2", i, ind, num, Field)} inputClass={"input Floor-input"} inputBoxClass={"input-box custom-field-input-box"} placeholder={"Enter Custom Field 2"} />
                                                </div>))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>))}
                    <div className='submit-button'>
                        <button className='button' onClick={() => onSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeScreen