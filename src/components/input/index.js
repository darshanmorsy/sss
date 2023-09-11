export const Input = ({ label, placeholder, type = 'text', value = "", onChange, inputClass = "input", inputBoxClass = "input-box" }) => (
    <div className={inputBoxClass}>
        <label>{label}</label>
        {type != "select" ? <input id={placeholder} value={value} onChange={(e) => { onChange(e.target.value) }} className={inputClass} type={type} placeholder={placeholder} /> :
            <select class={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter number of rooms">
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4 BHK</option>
                <option>5 BHK</option>
                <option>6 BHK</option>
                <option>7 BHK</option>
            </select>}
    </div>
)