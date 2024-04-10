

CREATE TABLE user {
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL ,
refresh_token TEXT 
}


CREATE TABLE post {
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
title VARCHAR(100),
description TEXT,
status TEXT,
product_id UUID REFERENCES product(id),
created_at TIMESTAMP,
updated_at TIMESTAMP,
expiry_date TIMESTAMP NOT NULL
}

CREATE TABLE product {
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
name TEXT,
description TEXT,
quantity INT,
unit_price INT,
url TEXT,
category_id UUID REFERENCES category(id) 
  }

CREATE TABLE user_post {
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
role_id UUID REFERENCES role(id),
post_id UUID REFERENCES post(id),
user_id UUID REFERENCES user(id)
}

CREATE TABLE role {
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
role VARCHAR(100) NOT NULL
}

CREATE TABLE category {
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
name VARCHAR(100) NOT NULL
}