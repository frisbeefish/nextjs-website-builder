Considering static/media location: /media/

nginx.conf

....

location /media {
auth_request /auth;
#...
}

location = /auth {
internal;
proxy_pass https://yourauthserver/is_authenticated;
proxy_pass_request_body off;
proxy_set_header Content-Length "";
#...
}
...

/is_authenticated This is the location where your web application check if user is authenticated or not.

Static/Media will be served only if is_authenticated returns status code 200.

https://stackoverflow.com/questions/54052932/nginx-serve-static-files-with-authentication

https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-subrequest-authentication/

Configuring NGINX and NGINX Plus

    Make sure your NGINX Open Source is compiled with the with-http_auth_request_module configuration option. Run this command and verify that the output includes --with-http_auth_request_module:

$ nginx -V 2>&1 | grep -- 'http_auth_request_module'

Skip this step for NGINX Plus as it already includes the auth_request module.

In the location that requires request authentication, specify the auth_request directive in which specify an internal location where an authorization subrequest will be forwarded to:

location /private/ {
auth_request /auth;
#...
}

Here, for each request to /private, a subrequest to the internal /auth location will be made.

Specify an internal location and the proxy_pass directive inside this location that will proxy authentication subrequests to an authentication server or service:

location = /auth {
internal;
proxy_pass http://auth-server;
#...
}

As the request body is discarded for authentication subrequests, you will need to set the proxy_pass_request_body directive to off and also set the Content-Length header to a null string:

location = /auth {
internal;
proxy_pass http://auth-server;
proxy_pass_request_body off;
proxy_set_header Content-Length "";
#...
}

Pass the full original request URI with arguments with the proxy_set_header directive:

location = /auth {
internal;
proxy_pass http://auth-server;
proxy_pass_request_body off;
proxy_set_header Content-Length "";
proxy_set_header X-Original-URI $request_uri;
}

As an option, you can set a variable value basing on the result of the subrequest with the auth_request_set directive:

    location /private/ {
        auth_request        /auth;
        auth_request_set $auth_status $upstream_status;
    }

http {
#...
server {
#...
location /private/ {
auth_request /auth;
auth_request_set $auth_status $upstream_status;
}

        location = /auth {
            internal;
            proxy_pass              http://auth-server;
            proxy_pass_request_body off;
            proxy_set_header        Content-Length "";
            proxy_set_header        X-Original-URI $request_uri;
        }
    }

}
