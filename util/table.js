"use strict";

function Table(parent, id){
		
	const noColumnNameError = (name) => new Error(`[Table] Column name ${name} doesnt exist`);
	const columnNameError = (name) => new Error(`[Table] Column name ${name} already exist`);
	
	const rows = [];
	const columns = new Map();
	
	const createRow = (row) => {
		
		const mapping = [...columns.keys()].reduce(
			(acc, key) => Object.assign(acc, {[key] : row[key]})
			,{}
		);
		
		const tr = document.createElement("tr");
		columns.forEach(
			(properties, key) => {
				const td = document.createElement("td");
				td.innerText = mapping[key] ? mapping[key] : "-";
				
				if (properties.hasOwnProperty("classList"))
					td.classList.add(...properties.classList);
				
				if (properties.hasOwnProperty("style"))
					td.style = properties.style;
				
				tr.append(td);
			}
		);
		
		return tr;
	};
	
	const createTopRow = () => {
		const tr = document.createElement("tr");
		columns.forEach(
			(properties, column_name) => {
				
				const th = document.createElement("th");
				
				th.innerText = properties.synonym ? properties.synonym : column_name;
				
				if (properties.sortable) {
					th.innerText += properties.otherwise ? "▼" : "▲";
					
					th.scope = "col";
					th.classList.add("clicable");
					
					th.addEventListener("click", () => {
						
						properties.otherwise ^= 1;
						
						this.sortByColumn(
							column_name, properties.otherwise, properties.isNumeric
						)
						.draw()
						
					});
				}
				
				tr.append(th);
				
			}
		);
		return tr;
	};
	
	this.sortByColumn = (columnName, otherwise=false, isNumeric=true) => {
		if (!columns.has(columnName))
			throw new noColumnNameError(columnName);
		if (isNumeric)
			rows.sort(
				(a, b) => (otherwise ? -1 : 1) * (a[columnName] - b[columnName])
			);
		else
			rows.sort(
				(a, b) => {
					const a_field = a[columnName] ? a[columnName].toString() : "";
					const b_field = b[columnName] ? b[columnName].toString() : "";
					return otherwise ? b_field.localeCompare(a_field) : a_field.localeCompare(b_field);
				}
			);
		return this;
	};
	
	this.addColumn = (columnName, propertires) => {
		if (columns.has(columnName))
			throw new columnNameError(columnName);
		columns.set(columnName, propertires);
		return this;
	};
	
	this.removeColumn = (columnName, propertires) => {
		if (!columns.has(columnName))
			throw new noColumnNameError(columnName);
		columns.set(columnName, propertires);
		return this;
	};
	
	this.setColumnPropertires = (columnName) => {
		if (!columns.has(columnName))
			throw new noColumnNameError(columnName);
		columns.delete(columnName);
		return this;
	};
	
	this.addRow = (row) => {
		rows.push(row);
		return this;
	};
	
	this.draw = () => {
		const table = document.createElement("table");
		table.id = id;
		
		table.append(createTopRow());
		
		rows.forEach(
			row => table.append(createRow(row))
		);
		
		let e = document.getElementById(id);
		if (e) e.remove();
		parent.append(table);
	};
	
	this.clearRows = () => {
		rows.splice(0,rows.length);
		return this;
	};
	
	this.clearColumns = () => {
		columns.clear();
		return this;
	};
	
	this.clear = () => this.clearColumns().clearRows();
	
	return this;
};