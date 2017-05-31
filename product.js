function Product(id,name,cat,quant,price){
	this.ID = id;
	this.Name = name;
	this.Cat = cat;
	this.Quantity = quant;
	this.Price = price;
	this.desc = '$'+ this.Price +' Quantity:'+this.Quantity;

	this.info = function(elem){
		//$(elem).empty();
		$(elem).append(this.desc);
	}

}