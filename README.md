# WHF - Test 
Test to enroll on WHF Technology as Developer


**Prerequisites :** Docker.

## Getting Started

Clone this project using the following commands:

```
git clone https://github.com/emaiadev/whf_enroll
cd whf_enroll
```

Install docker and docker-compose

### Set up the Backend

After install docker, run those commands above:

```
docker-compose up --build
```

Take a breath, take a coffee ... After all containers finished:
```
docker exec -it whf_php bash
```

Now, you are inside of php container! Run:
```
composer install
```

Run the migrations and run to the hills !
```
php artisan migrate
```

Loading [127.0.0.1:8000](127.0.0.1:8000) backend server is Online !

### Set up the Frontend

Nothing ... !

Loading [127.0.0.1:8001](127.0.0.1:8001) frontend server is Online !

