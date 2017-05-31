function Category(id, name, desc){
	this.ID = id;
	this.Desc = desc;
	this.Name = name;

	this.info = function(elem){
		$(elem).empty();
		$(elem).append(Desc);
	}
}