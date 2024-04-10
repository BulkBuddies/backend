

Table user {
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL ,
refresh_token TEXT 
}


Table post {
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
title VARCHAR(100),
description TEXT,
status TEXT,
product_id UUID REFERENCES product(id),
user_id UUID REFERENCES user(id),
created_at TIMESTAMP,
updated_at TIMESTAMP,
expiry_date TIMESTAMP NOT NULL
}

Table product {
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
name TEXT,
description TEXT,
quantity INT,
unit_price INT,
url TEXT,
category_id UUID REFERENCES category(id) 
  }

Table user_post_join {
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
post_id UUID REFERENCES post(id),
user_id UUID REFERENCES user(id)
}

Table category {
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
name VARCHAR(100) NOT NULL
}