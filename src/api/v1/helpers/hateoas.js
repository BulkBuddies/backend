const prepareHateoas = async (entity, data) => {

    const result = data 
    .map((v) => {
        return {
            name: v.nombre,
            href: `product/${entity}/${v.id}`,
        };
    })
    //.slice(0,10); 
    const total = data.length;
    const HATEOAS = {
        total,
        result,
    };
    return HATEOAS;
 }

 export default prepareHateoas;