"use strict";

function TableMapper(parent) {
		
	const NoTableError = (name) => new Error(`[TableMapper] Table with name ${name} doesn't exist`);
	
	const selectors = document.getElementById("selectors");
	let current_selector = null;
	
	const tables_properties = new Map();
	const main_table = new Table(parent, "basic");
	
	this.change = (table_name) => {
		
		if(!tables_properties.has(table_name))
			throw NoTableError(table_name);
		
		main_table.clearColumns();
		const selected_table = tables_properties.get(table_name);
		selected_table.columns.forEach(
			(properties, column_name) => 
				main_table.addColumn(column_name, properties)
		);
		main_table.draw();
	};
	
	this.getTableBuilder = (table_mapper = this) => new (function() {
		
		const add_selector = () => {
			const selector = document.createElement("span");
			selector.innerText = column_name_synonym || column_name;
			selector.classList.add("clickable");
			
			selector.addEventListener("click", () => {
				if(current_selector)
					current_selector.classList.remove("selected");
				
				table_mapper.change(column_name);
				
				current_selector = selector;
				current_selector.classList.add("selected");
			});
			
			selectors.append(selector);
		};
		
		const columns = new Map();
		let column_name = "";
		let column_name_synonym = "";
		
		this.addColumn = (column_name, properties) => {
			columns.set(column_name, properties);
			return this;
		};
		
		this.setName = (name) => {
			column_name = name;
			return this;
		};
		
		this.setSynonym = (synonym) => {
			column_name_synonym = synonym;
			return this;
		};
		
		this.addTable = () => {
			tables_properties.set(column_name, {
				columns: columns
			});
			add_selector();
		};
		
		return this;
	})();
	
	this.draw = main_table.draw.bind(main_table);
	this.addRow = main_table.addRow.bind(main_table);
	this.clearRows = main_table.clearRows.bind(main_table);
	this.clear = main_table.clear.bind(main_table);
};