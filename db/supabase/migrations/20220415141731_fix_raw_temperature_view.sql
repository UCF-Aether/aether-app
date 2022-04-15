update layer.definition
set tv_ref = 'raw_temperature_view'
where tv_ref = 'raw_temperature';
select * from layer.definition;