export const apps = [{
    name: "dev-api",
    script: "npm",
    args: "run start",
    env: {
        NODE_ENV: "development",
        PORT: 3000
    },
    watch: false,
    max_memory_restart: "1G",
    restart_delay: 1000,
    listen_timeout: 10000,
    kill_timeout: 5000,
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    error_file: "/home/ec2-user/logs/dev-api-error.log",
    out_file: "/home/ec2-user/logs/dev-api-out.log"
}];