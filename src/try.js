<select className="form-control"  value={this.props.obj.city} onChange={this.handlecityChange}>
    <option id={0} key={0}>{(this.props.obj.city!=='')?this.props.obj.city:'--Select City--'}</option>
    {
        this.props.c.map((city)=>{
            return <option key={city._id} id={city._id}>{city.cityName}</option>
        })
    }
</select>